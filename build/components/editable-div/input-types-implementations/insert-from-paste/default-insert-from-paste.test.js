/** @jest-environment jsdom */
import { EditableDiv } from '../../editable-div';
describe('Editable Div - paste behavior', () => {
    let editable;
    beforeEach(() => {
        editable = EditableDiv.create();
        editable.setup();
        document.body.appendChild(editable);
        editable.focus();
    });
    afterEach(() => {
        document.body.removeChild(editable);
        jest.clearAllMocks();
    });
    function setupHtmlAndCursor(htmlWithCursor) {
        var _a;
        editable.innerHTML = htmlWithCursor;
        const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT, null);
        let node = null;
        let foundNode = null;
        let offset = -1;
        while ((node = walker.nextNode())) {
            const idx = (_a = node.nodeValue) === null || _a === void 0 ? void 0 : _a.indexOf('|');
            if (idx !== undefined && idx !== -1) {
                foundNode = node;
                offset = idx;
                break;
            }
        }
        if (foundNode) {
            foundNode.nodeValue = foundNode.nodeValue.replace('|', '');
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(foundNode, offset);
            range.collapse(true);
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }
    }
    function setupHtmlAndCursor2(htmlWithCursor) {
        var _a, _b;
        editable.innerHTML = htmlWithCursor;
        const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT, null);
        let node = null;
        let foundNodes = [];
        let offsets = [];
        while ((node = walker.nextNode())) {
            let idx = (_a = node.nodeValue) === null || _a === void 0 ? void 0 : _a.indexOf('|');
            let sameNode = 0;
            while (idx != undefined && idx !== -1) {
                foundNodes.push(node);
                if (sameNode > 0) {
                    offsets.push(idx - offsets.length);
                }
                else {
                    offsets.push(idx);
                }
                idx = (_b = node.nodeValue) === null || _b === void 0 ? void 0 : _b.indexOf('|', idx + 1);
                sameNode++;
            }
        }
        if (foundNodes.length == 1) {
            const foundNode = foundNodes[0];
            const offset = offsets[0];
            foundNode.nodeValue = foundNode.nodeValue.replace('|', '');
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(foundNode, offset);
            range.collapse(true);
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }
        else if (foundNodes.length == 2) {
            const [startNode, endNode] = foundNodes;
            const [startOffset, endOffset] = offsets;
            startNode.nodeValue = startNode.nodeValue.replace('|', '');
            endNode.nodeValue = endNode.nodeValue.replace('|', '');
            const selection = window.getSelection();
            const range = document.createRange();
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        }
    }
    function simulatePaste(data) {
        /*
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', data);
        */
        const dataTransfer = {
            getData: (type) => type === 'text/plain' ? data : '',
            setData: () => { },
            clearData: () => { },
            dropEffect: 'none',
            effectAllowed: 'none',
            files: [],
            items: [],
            types: ['text/plain'],
            setDragImage: () => { },
        };
        console.log('++++++++ =>', dataTransfer.getData('text/plain'));
        const event = new InputEvent('beforeinput', {
            bubbles: true,
            cancelable: true,
            inputType: 'insertFromPaste',
            dataTransfer
        });
        Object.defineProperty(event, 'dataTransfer', {
            value: dataTransfer,
        });
        editable.dispatchEvent(event);
    }
    function getExpectedHtml(htmlWithCursor) {
        return htmlWithCursor.replace(/\|/g, '');
    }
    describe('Ao disparar o evento paste deve acontecer (cursor colapsado, paste de uma linha):', () => {
        it('1. paste com a linha vazia e cursor colapsado em cima', () => {
            const antes = '<div>|<br></div>';
            const depois = '<div>paste|</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. paste com texto e cursor colapsado no inicio', () => {
            const antes = '<div>|texto</div>';
            const depois = '<div>paste|texto</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. paste com texto e cursor colapsado no meio', () => {
            const antes = '<div>tex|to</div>';
            const depois = '<div>texpaste|to</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('4. paste com texto e cursor colapsado no fim', () => {
            const antes = '<div>texto|</div>';
            const depois = '<div>textopaste|</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao disparar o evento paste deve acontecer (cursor colapsado, paste de duas linhas):', () => {
        it('1. paste com a linha vazia e cursor colapsado em cima', () => {
            const antes = '<div>|<br></div>';
            const depois = '<div>paste1</div><div>paste2|</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste1\npaste2');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. paste com texto e cursor colapsado no inicio', () => {
            const antes = '<div>|texto</div>';
            const depois = '<div>paste1</div><div>paste2|texto</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste1\npaste2');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. paste com texto e cursor colapsado no meio', () => {
            const antes = '<div>tex|to</div>';
            const depois = '<div>texpaste1</div><div>paste2|to</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste1\npaste2');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('4. paste com texto e cursor colapsado no fim', () => {
            const antes = '<div>texto|</div>';
            const depois = '<div>textopaste1</div><div>paste2|</div>';
            setupHtmlAndCursor(antes);
            simulatePaste('paste1\npaste2');
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
});
