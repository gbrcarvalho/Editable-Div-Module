(function() {
  "use strict";
  class TextBlock {
    static isBlock(element) {
      var _a;
      if (!(element instanceof HTMLElement))
        return false;
      if (!((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.hasAttribute("contenteditable")))
        return false;
      return true;
    }
    static isEmpty(block) {
      return block.innerHTML == "<br>";
    }
    static create(textContent) {
      const block = document.createElement("div");
      block.innerHTML = "<br>";
      if (textContent)
        block.textContent = textContent;
      return block;
    }
    static createMany(text) {
      return text.split("\n").map((line) => TextBlock.create(line));
    }
    static merge([firstLine, secondLine]) {
      return TextBlock.create(firstLine.textContent + secondLine.textContent);
    }
    static split(block, offset) {
      const before = block.cloneNode();
      const after = block.cloneNode();
      before.innerHTML = "<br>";
      after.innerHTML = "<br>";
      const beforeText = block.textContent.substring(0, offset);
      if (beforeText)
        before.textContent = beforeText;
      const afterText = block.textContent.substring(offset);
      if (afterText)
        after.textContent = afterText;
      return [before, after];
    }
  }
  class Line {
    static isLine(element) {
      if (!(element instanceof HTMLDivElement))
        return false;
      if (!element.hasAttribute("line"))
        return false;
      return true;
    }
    static isEmpty(line) {
      return line.innerHTML == "<br>";
    }
    static create(textContent) {
      const line = document.createElement("div");
      line.setAttribute("line", "");
      line.innerHTML = "<br>";
      if (textContent)
        line.textContent = textContent;
      return line;
    }
    static createMany(text) {
      return text.split("\n").map((line) => Line.create(line));
    }
    static split(line, offset) {
      const text = line.textContent;
      const before = Line.create((text !== null && text !== void 0 ? text : "").substring(0, offset));
      const after = Line.create((text !== null && text !== void 0 ? text : "").substring(offset));
      return [before, after];
    }
    static merge([firstLine, secondLine]) {
      return Line.create(firstLine.textContent + secondLine.textContent);
    }
  }
  class Cursor {
    static get(scope) {
      const s = window.getSelection();
      if (!s)
        throw new Error("Couldnt get the Selection object!");
      const { type: caretType } = s;
      if (caretType == "None")
        throw new Error("No selection");
      const range = s.getRangeAt(0);
      const { startContainer, startOffset, endContainer, endOffset } = range;
      if (scope && (!scope.contains(startContainer) || !scope.contains(startContainer)))
        throw new Error("Cursor is outside the given scope");
      return {
        type: caretType,
        range: [
          { node: startContainer, offset: startOffset },
          { node: endContainer, offset: endOffset }
        ],
        deleteContents: function() {
          range.deleteContents();
        },
        cloneContents: function() {
          return range.cloneContents();
        }
      };
    }
    static set(caret) {
      const s = window.getSelection();
      if (!s)
        throw new Error("Couldnt get the Selection object!");
      const range = s.getRangeAt(0);
      const [start, end] = caret;
      range.setStart(start.node, start.offset);
      if (end) {
        range.setEnd(end.node, end.offset);
      } else {
        range.setEnd(start.node, start.offset);
      }
    }
  }
  class Caret {
    static get(scope) {
      const s = window.getSelection();
      if (!s)
        throw new Error("Couldnt get the Selection object!");
      const { anchorNode, anchorOffset } = s;
      if (!anchorNode)
        throw new Error("No caret on selection");
      if (scope && !scope.contains(anchorNode))
        throw new Error("Caret is outside the given scope");
      return {
        node: anchorNode,
        offset: anchorOffset
      };
    }
    static getAll(scope) {
      const s = window.getSelection();
      if (!s)
        throw new Error("Couldnt get the Selection object!");
      const { type } = s;
      if (type == "None")
        throw new Error("No selection");
      const { anchorNode, anchorOffset, focusNode, focusOffset } = s;
      if (!anchorNode || !focusNode)
        throw new Error("No caret on selection");
      if (scope && (!scope.contains(anchorNode) || !scope.contains(focusNode)))
        throw new Error("Caret is outside the given scope");
      if (type == "Caret") {
        return [
          { node: anchorNode, offset: anchorOffset }
        ];
      } else {
        return [
          { node: anchorNode, offset: anchorOffset },
          { node: focusNode, offset: focusOffset }
        ];
      }
    }
    static getXY() {
    }
    static set({ node, offset }) {
      const s = window.getSelection();
      if (!s)
        throw new Error("Couldnt get the Selection object!");
      s.setPosition(node, offset);
    }
  }
  function closest(node, testFn) {
    const defaultTestFn = (line) => line instanceof HTMLElement;
    let parent = node.parentElement;
    while (parent && !(testFn !== null && testFn !== void 0 ? testFn : defaultTestFn)(parent)) {
      parent = parent.parentElement;
    }
    return parent;
  }
  function splitLineOnCaret({ node, offset }) {
    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
    if (!line)
      return;
    const [before, after] = TextBlock.split(line, offset);
    line.replaceWith(before, after);
    Caret.set({ node: after, offset: 0 });
  }
  function splitLineOnRange([start, end]) {
    if (start.node == end.node) {
      const node = start.node;
      let startPos = start.offset;
      let endPos = end.offset;
      if (startPos > endPos)
        [startPos, endPos] = [endPos, startPos];
      const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
      if (!line)
        return;
      const [before, after] = TextBlock.split(line, endPos);
      before.textContent = before.textContent.substring(0, startPos);
      line.replaceWith(before, after);
      if (startPos == 0) {
        before.innerHTML = "<br>";
      }
      if (endPos == line.textContent.length) {
        after.innerHTML = "<br>";
      }
      Caret.set({ node: after, offset: 0 });
      return;
    }
    const startLine = TextBlock.isBlock(start.node) ? start.node : closest(start.node, TextBlock.isBlock);
    if (!startLine)
      return;
    const endLine = TextBlock.isBlock(end.node) ? end.node : closest(end.node, TextBlock.isBlock);
    if (!endLine)
      return;
    const sel = window.getSelection();
    if (!sel)
      return;
    const maxOffset = endLine.textContent.length;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    if (start.offset == 0) {
      startLine.innerHTML = "<br>";
    }
    if (end.offset == maxOffset) {
      endLine.innerHTML = "<br>";
    }
    Caret.set({ node: endLine, offset: 0 });
  }
  function mergeForward({ node, offset }) {
    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
    if (!line)
      return;
    const nextLine = line.nextElementSibling;
    if (!TextBlock.isBlock(nextLine))
      return;
    const merged = TextBlock.merge([line, nextLine]);
    line.replaceWith(merged);
    nextLine.remove();
    Caret.set({ node: merged.firstChild, offset });
  }
  function mergeBackward({ node }) {
    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
    if (!line)
      return;
    const prevLine = line.previousElementSibling;
    if (!TextBlock.isBlock(prevLine))
      return;
    const merged = TextBlock.merge([prevLine, line]);
    const offset = prevLine.textContent.length;
    prevLine.replaceWith(merged);
    line.remove();
    Caret.set({ node: merged.firstChild, offset });
  }
  const pasteHandler = (ev) => {
    var _a;
    if (!(ev instanceof ClipboardEvent))
      return;
    ev.preventDefault();
    const text = (_a = ev.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
    console.log("text: ", text);
    if (!text)
      return;
    const lines = Line.createMany(text);
    if (lines.length == 0)
      return;
    const { node: initialNode, offset: initialOffset } = Caret.get(
      /*textBoxElement*/
    );
    const initialLine = Line.isLine(initialNode) ? initialNode : closest(initialNode, Line.isLine);
    if (!Line.isLine(initialLine))
      throw new Error(`should be line: ${initialLine}`);
    const [beforeCaret, afterCaret] = Line.split(initialLine, initialOffset);
    let merged;
    if (lines.length == 1) {
      merged = Line.merge([beforeCaret, lines[0]]);
      const offset = merged.textContent.length;
      merged = Line.merge([merged, afterCaret]);
      initialLine.replaceWith(merged);
      Caret.set({ node: merged.firstChild, offset });
    } else {
      const firstMerge = Line.merge([beforeCaret, lines[0]]);
      const lastMerge = Line.merge([lines[lines.length - 1], afterCaret]);
      initialLine.replaceWith(firstMerge);
      let after = firstMerge;
      for (let i = 1; i < lines.length - 1; i++) {
        after.insertAdjacentElement("afterend", lines[i]);
        after = lines[i];
      }
      const offset = lines[lines.length - 1].textContent.length;
      after.insertAdjacentElement("afterend", lastMerge);
      Caret.set({ node: lastMerge.firstChild, offset });
    }
    return;
  };
  const KeydownStrategy = {
    "Backspace": {
      "Caret": (ev, caret) => {
        const { node, offset } = caret;
        if (offset == 0) {
          ev.preventDefault();
          mergeBackward({ node });
        }
      },
      "Range": (ev, caret) => {
        const { node, offset } = caret[0];
        if (offset == 0) {
          ev.preventDefault();
          mergeBackward({ node });
        }
      }
    },
    "Delete": {
      "Caret": (ev, caret) => {
        var _a;
        const { node, offset } = caret;
        if (offset == ((_a = node.textContent) !== null && _a !== void 0 ? _a : "").length) {
          ev.preventDefault();
          mergeForward({ node, offset });
        }
      },
      "Range": (ev, caret) => {
        var _a;
        const { node, offset } = caret[0];
        if (offset == ((_a = node.textContent) !== null && _a !== void 0 ? _a : "").length) {
          ev.preventDefault();
          mergeForward({ node, offset });
        }
      }
    },
    "Enter": {
      "Caret": (ev, caret) => {
        ev.preventDefault();
        if (ev.shiftKey)
          return;
        splitLineOnCaret(caret);
      },
      "Range": (ev, range) => {
        ev.preventDefault();
        if (ev.shiftKey)
          return;
        splitLineOnRange(range);
      }
    },
    "z": (ev) => {
      const isUndo = ev.ctrlKey && ev.key == "z";
      const isRedo = ev.ctrlKey && (ev.key == "z" && ev.shiftKey);
      if (isUndo || isRedo)
        ev.preventDefault();
    },
    "y": (ev) => {
      const isRedo = ev.ctrlKey && ev.key === "y";
      if (isRedo)
        ev.preventDefault();
    }
  };
  const keydownHandler = (ev) => {
    var _a, _b;
    if (!(ev instanceof KeyboardEvent))
      return;
    const key = ev.key;
    const cursor = Cursor.get();
    const type = cursor.type;
    const [start, end] = cursor.range;
    const handler = KeydownStrategy[key];
    if (!handler)
      return;
    if (typeof handler == "function") {
      handler(ev);
      return;
    }
    if (type == "Range") {
      (_a = handler["Range"]) === null || _a === void 0 ? void 0 : _a.call(handler, ev, [start, end]);
      return;
    }
    (_b = handler["Caret"]) === null || _b === void 0 ? void 0 : _b.call(handler, ev, start);
  };
  const dragOverHandler = (ev) => {
    if (!(ev instanceof DragEvent))
      return;
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "none";
    }
  };
  const dropHandler = (ev) => {
    ev.preventDefault();
  };
  const Handlers = [
    { type: "keydown", callback: keydownHandler },
    { type: "paste", callback: pasteHandler },
    { type: "dragover", callback: dragOverHandler },
    { type: "drop", callback: dropHandler }
  ];
  class EditableDiv {
    static create() {
      const element = document.createElement("div");
      element.setAttribute("contenteditable", "");
      element.innerHTML = TextBlock.create().outerHTML;
      Handlers.forEach(({ type, callback, options }) => element.addEventListener(type, callback, options));
      return element;
    }
  }
  const editableDiv = EditableDiv.create();
  document.body.append(editableDiv);
})();
