import { TextBlock } from './text-elements';
const registry = {
    'default': TextBlock
};
export class EditableDiv {
    static create(baseBlock) {
        var _a;
        const element = document.createElement('div');
        element.contentEditable = 'true';
        element.innerHTML = (_a = baseBlock === null || baseBlock === void 0 ? void 0 : baseBlock.create().outerHTML) !== null && _a !== void 0 ? _a : '<div><br></div>';
        element.setup = setupEditableDiv;
        element.registerBlockType = registerBlockType;
        element.select = select;
        return element;
    }
}
function getClosestBlock(node) {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = node === null || node === void 0 ? void 0 : node.parentElement) === null || _a === void 0 ? void 0 : _a.closest('[data-type]')) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : null;
}
function select(from, to) {
    if (!from)
        return getCursorState(this);
    setCursorState(from, to);
}
function getCursorState(element) {
    const s = window.getSelection();
    if (!s)
        throw new Error('Couldnt get the Selection object!');
    const { type: caretType } = s;
    if (caretType == 'None')
        throw new Error('No selection');
    const range = s.getRangeAt(0);
    const { startContainer, startOffset, endContainer, endOffset } = range;
    if (!(element.contains(startContainer)) || !(element.contains(startContainer)))
        throw new Error('Cursor is outside the given scope');
    return {
        type: caretType,
        from: { node: startContainer, offset: startOffset },
        to: { node: endContainer, offset: endOffset },
        set: function (from, to) {
            setCursorState(from, to);
        },
        deleteContents: function () {
            range.deleteContents();
        },
        cloneContents: function () {
            return range.cloneContents();
        }
    };
}
function setCursorState(from, to) {
    const s = window.getSelection();
    if (!s)
        throw new Error('Couldnt get the Selection object!');
    const range = s.getRangeAt(0);
    range.setStart(from.node, from.offset);
    if (to) {
        range.setEnd(to.node, to.offset);
    }
    else {
        range.setEnd(from.node, from.offset);
    }
}
function setupEditableDiv() {
    this.addEventListener('beforeinput', (ev) => {
        var _a, _b;
        const cursor = this.select();
        const { from, to } = cursor;
        const startBlock = (_a = getClosestBlock(from.node)) !== null && _a !== void 0 ? _a : 'default';
        const endBlock = (_b = getClosestBlock(to.node)) !== null && _b !== void 0 ? _b : 'default';
        if (startBlock != endBlock)
            return;
        console.log('beforeinput: ', ev.inputType);
        const handler = registry[startBlock].handlers[ev.inputType];
        if (handler) {
            console.log('handler found -> dataTransfer: ', ev);
            handler(ev, cursor);
            return;
        }
    });
}
function registerBlockType(blockType) {
    const { name } = blockType;
    if (name == 'default')
        return;
    registry[name] = blockType;
}
