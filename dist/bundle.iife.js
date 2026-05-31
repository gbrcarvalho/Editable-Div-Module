(function() {
  "use strict";
  function closest(node, testFn) {
    const defaultTestFn = (line) => line instanceof HTMLElement;
    let parent = node.parentElement;
    while (parent && !(testFn !== null && testFn !== void 0 ? testFn : defaultTestFn)(parent)) {
      parent = parent.parentElement;
    }
    return parent;
  }
  let textBlockHandlers = {
    insertParagraph(ev, cursor) {
      const type = cursor.type;
      if (type == "Range") {
        ev.preventDefault();
        TextBlock.splitLineOnRange(cursor);
        return;
      }
      ev.preventDefault();
      TextBlock.splitLineOnCaret(cursor);
    },
    deleteContentBackward(ev, cursor) {
      const { node, offset } = cursor.from;
      if (cursor.type == "Caret" && offset == 0) {
        ev.preventDefault();
        TextBlock.mergeBackward(cursor);
      } else if (offset == 1 && offset == node.textContent.length) {
        ev.preventDefault();
        const parent = node.parentElement;
        const newNode = parent.cloneNode();
        newNode.innerHTML = "<br>";
        parent.replaceWith(newNode);
        cursor.set({ node: newNode, offset: 0 });
      } else if (cursor.type == "Range" && cursor.from.node == cursor.to.node && cursor.from.node.textContent.length == cursor.to.offset && cursor.from.offset == 0) {
        ev.preventDefault();
        const parent = node.parentElement;
        parent.innerHTML = "<br>";
        cursor.set({ node: parent, offset: 0 });
      }
    },
    // TODO: deleteWordBackward para não apagar o bloco-base
    // TODO: deleteSoftLineBackward para não apagar o bloco-base
    // TODO: deleteByCut para não apagar o bloco base
    // TODO: ou implementar uma função de recover para nunca perder o bloco-base --fallback--
    deleteContentForward(ev, cursor) {
      var _a;
      const { node, offset } = cursor.from;
      if (cursor.type == "Caret" && offset == ((_a = node.textContent) !== null && _a !== void 0 ? _a : "").length) {
        ev.preventDefault();
        TextBlock.mergeForward(cursor);
      } else if (cursor.type == "Range" && cursor.from.node == cursor.to.node && cursor.from.node.textContent.length == cursor.to.offset && cursor.from.offset == 0) {
        ev.preventDefault();
        const parent = node.parentElement;
        parent.innerHTML = "<br>";
        cursor.set({ node: parent, offset: 0 });
      }
    },
    insertLineBreak(ev, cursor) {
      ev.preventDefault();
    },
    insertFromDrop(ev, cursor) {
      ev.preventDefault();
    },
    // TODO: terminar os testes para insertFromPaste
    insertFromPaste(ev, cursor) {
      var _a;
      if (!(ev instanceof InputEvent))
        return;
      ev.preventDefault();
      const text = (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
      console.log("handler running inputType: ", ev);
      console.log("text: ", text);
      if (!text)
        return;
      const lines = Line.createMany(text);
      if (lines.length == 0)
        return;
      const { node: initialNode, offset: initialOffset } = cursor.from;
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
        cursor.set({ node: merged.firstChild, offset });
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
        cursor.set({ node: lastMerge.firstChild, offset });
      }
      return;
    },
    historyUndo(ev, cursor) {
      ev.preventDefault();
    },
    historyRedo(ev, cursor) {
      ev.preventDefault();
    }
  };
  const nbsp = " ";
  class TextBlock {
    static set handlers(inputHandlers) {
      textBlockHandlers = inputHandlers;
    }
    static get handlers() {
      return textBlockHandlers;
    }
    // TODO: Consertar essa lógica para bater com o tipo Block
    static isBlock(element) {
      var _a;
      if (!(element instanceof HTMLElement))
        return false;
      if (!(((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.contentEditable) == "true"))
        return false;
      return true;
    }
    // TODO: Esse metodo está sendo usado?
    static isEmpty(block) {
      return block.innerHTML == "<br>";
    }
    static create(textContent) {
      const block = document.createElement("div");
      block.innerHTML = "<br>";
      if (textContent) {
        block.textContent = textContent;
      } else if (textContent == " ") {
        block.textContent = nbsp;
      } else if ((textContent === null || textContent === void 0 ? void 0 : textContent[textContent.length - 1]) == " ") {
        block.textContent = textContent.substring(0, textContent.length - 1) + nbsp;
      } else if ((textContent === null || textContent === void 0 ? void 0 : textContent[0]) == " ") {
        block.textContent = nbsp + textContent.substring(1, textContent.length);
      }
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
    //static mergeBackward({ node }: ICaretPosition) {
    static mergeBackward(cursor) {
      const { node } = cursor.from;
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
      cursor.set({ node: merged.firstChild, offset });
    }
    //static mergeForward({ node, offset }: ICaretPosition) {
    static mergeForward(cursor) {
      const { node, offset } = cursor.from;
      const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
      if (!line)
        return;
      const nextLine = line.nextElementSibling;
      if (!TextBlock.isBlock(nextLine))
        return;
      const merged = TextBlock.merge([line, nextLine]);
      line.replaceWith(merged);
      nextLine.remove();
      cursor.set({ node: merged.firstChild, offset });
    }
    // TODO: splitLineOnCaret pode ser removida posteriormente, pois
    // splitLineOnRange já cobre seleções colapsadas também
    // falta testar o caso dele não encontrar a linha
    static splitLineOnCaret(cursor) {
      const { node, offset } = cursor.from;
      const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
      if (!line)
        return;
      const [before, after] = TextBlock.split(line, offset);
      line.replaceWith(before, after);
      cursor.set({ node: after, offset: 0 });
    }
    // TODO:
    // falta testar o da seleção feita da direção inversa
    // falta os casos em que ele não encontra as linhas
    static splitLineOnRange(cursor) {
      const { from: start, to: end } = cursor;
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
        cursor.set({ node: after, offset: 0 });
        return;
      }
      const startLine = TextBlock.isBlock(start.node) ? start.node : closest(start.node, TextBlock.isBlock);
      if (!startLine)
        return;
      const endLine = TextBlock.isBlock(end.node) ? end.node : closest(end.node, TextBlock.isBlock);
      if (!endLine)
        return;
      const maxOffset = endLine.textContent.length;
      cursor.deleteContents();
      if (start.offset == 0) {
        startLine.innerHTML = "<br>";
      }
      if (end.offset == maxOffset) {
        endLine.innerHTML = "<br>";
      }
      cursor.set({ node: endLine, offset: 0 });
    }
  }
  class Line {
    static isLine(element) {
      if (!(element instanceof HTMLDivElement))
        return false;
      return true;
    }
    static isEmpty(line) {
      return line.innerHTML == "<br>";
    }
    static create(textContent) {
      const line = document.createElement("div");
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
  const registry = {
    "default": TextBlock
  };
  class EditableDiv {
    static create(baseBlock) {
      var _a;
      const element = document.createElement("div");
      element.contentEditable = "true";
      element.innerHTML = (_a = baseBlock === null || baseBlock === void 0 ? void 0 : baseBlock.create().outerHTML) !== null && _a !== void 0 ? _a : "<div><br></div>";
      element.setup = setupEditableDiv;
      element.registerBlockType = registerBlockType;
      element.select = select;
      return element;
    }
  }
  function getClosestBlock(node) {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = node === null || node === void 0 ? void 0 : node.parentElement) === null || _a === void 0 ? void 0 : _a.closest("[data-type]")) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : null;
  }
  function select(from, to) {
    if (!from)
      return getCursorState(this);
    setCursorState(from, to);
  }
  function getCursorState(element) {
    const s = window.getSelection();
    if (!s)
      throw new Error("Couldnt get the Selection object!");
    const { type: caretType } = s;
    if (caretType == "None")
      throw new Error("No selection");
    const range = s.getRangeAt(0);
    const { startContainer, startOffset, endContainer, endOffset } = range;
    if (!element.contains(startContainer) || !element.contains(startContainer))
      throw new Error("Cursor is outside the given scope");
    return {
      type: caretType,
      from: { node: startContainer, offset: startOffset },
      to: { node: endContainer, offset: endOffset },
      set: function(from, to) {
        setCursorState(from, to);
      },
      deleteContents: function() {
        range.deleteContents();
      },
      cloneContents: function() {
        return range.cloneContents();
      }
    };
  }
  function setCursorState(from, to) {
    const s = window.getSelection();
    if (!s)
      throw new Error("Couldnt get the Selection object!");
    const range = s.getRangeAt(0);
    range.setStart(from.node, from.offset);
    if (to) {
      range.setEnd(to.node, to.offset);
    } else {
      range.setEnd(from.node, from.offset);
    }
  }
  function setupEditableDiv() {
    this.addEventListener("beforeinput", (ev) => {
      var _a, _b;
      const cursor = this.select();
      const { from, to } = cursor;
      const startBlock = (_a = getClosestBlock(from.node)) !== null && _a !== void 0 ? _a : "default";
      const endBlock = (_b = getClosestBlock(to.node)) !== null && _b !== void 0 ? _b : "default";
      if (startBlock != endBlock)
        return;
      console.log("beforeinput: ", ev.inputType);
      const handler = registry[startBlock].handlers[ev.inputType];
      if (handler) {
        console.log("handler found -> dataTransfer: ", ev);
        handler(ev, cursor);
        return;
      }
    });
  }
  function registerBlockType(blockType) {
    const { name } = blockType;
    if (name == "default")
      return;
    registry[name] = blockType;
  }
  const editableDiv = EditableDiv.create();
  editableDiv.setup();
  document.body.append(editableDiv);
})();
