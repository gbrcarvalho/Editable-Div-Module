import { Cursor } from '../../../utils/selection';
import { splitLineOnCaret, splitLineOnRange } from './enter/default-enter-behavior';
import { mergeForward } from './delete/default-delete-behavior';
import { mergeBackward } from './backspace/default-backspace-behavior';
import { pasteHandler } from './paste/default-paste-behavior';
export const KeydownStrategy = {
    'Backspace': {
        'Caret': (ev, caret) => {
            const { node, offset } = caret;
            if (offset == 0) {
                ev.preventDefault();
                mergeBackward({ node, offset });
            }
        },
        'Range': (ev, caret) => {
            const { node, offset } = caret[0];
            if (offset == 0) {
                ev.preventDefault();
                mergeBackward({ node, offset });
            }
        },
    },
    'Delete': {
        'Caret': (ev, caret) => {
            var _a;
            const { node, offset } = caret;
            if (offset == ((_a = node.textContent) !== null && _a !== void 0 ? _a : '').length) { // ao apertar delete no final da linha
                ev.preventDefault();
                mergeForward({ node, offset });
            }
        },
        'Range': (ev, caret) => {
            var _a;
            const { node, offset } = caret[0];
            if (offset == ((_a = node.textContent) !== null && _a !== void 0 ? _a : '').length) { // ao apertar delete no final da linha
                ev.preventDefault();
                mergeForward({ node, offset });
            }
        },
    },
    'Enter': {
        'Caret': (ev, caret) => {
            ev.preventDefault();
            if (ev.shiftKey)
                return;
            splitLineOnCaret(caret);
        },
        'Range': (ev, range) => {
            ev.preventDefault();
            if (ev.shiftKey)
                return;
            splitLineOnRange(range);
        },
    },
    'z': (ev) => {
        const isUndo = (ev.ctrlKey) && (ev.key == 'z');
        const isRedo = (ev.ctrlKey) && (ev.key == 'z' && ev.shiftKey);
        if (isUndo || isRedo)
            ev.preventDefault();
    },
    'y': (ev) => {
        const isRedo = (ev.ctrlKey) && (ev.key === 'y');
        if (isRedo)
            ev.preventDefault();
    },
};
const TextElements = {
    'default': {}
};
export const keydownHandler = (ev) => {
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
    if (typeof handler == 'function') {
        handler(ev);
        return;
    }
    if (type == 'Range') {
        (_a = handler['Range']) === null || _a === void 0 ? void 0 : _a.call(handler, ev, [start, end]);
        return;
    }
    (_b = handler['Caret']) === null || _b === void 0 ? void 0 : _b.call(handler, ev, start);
};
const dragOverHandler = (ev) => {
    if (!(ev instanceof DragEvent))
        return;
    ev.preventDefault();
    if (ev.dataTransfer) {
        ev.dataTransfer.dropEffect = 'none';
    }
};
const dropHandler = (ev) => {
    ev.preventDefault();
};
export const Handlers = [
    { type: 'keydown', callback: keydownHandler },
    { type: 'paste', callback: pasteHandler },
    { type: 'dragover', callback: dragOverHandler },
    { type: 'drop', callback: dropHandler },
];
