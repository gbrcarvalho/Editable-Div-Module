/** @jest-environment jsdom */
import { Caret } from '../../../../utils/selection';
import { mergeBackward } from './default-backspace-behavior';
const backspaceHandler = () => {
    mergeBackward(Caret.get());
};
describe('Editable Div - Backspace keydown behavior', () => {
    let editable;
    beforeEach(() => {
        editable = document.createElement('div');
        editable.setAttribute('contenteditable', '');
        //editable.contentEditable = 'true'
        editable.addEventListener('keydown', backspaceHandler);
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
    function simulateBackspace() {
        const event = new KeyboardEvent('keydown', {
            key: 'Backspace',
            code: 'Backspace',
            keyCode: 8,
            bubbles: true,
            cancelable: true,
        });
        editable.dispatchEvent(event);
    }
    function getExpectedHtml(htmlWithCursor) {
        return htmlWithCursor.replace(/\|/g, '');
    }
    describe('Ao pressionar backspace no textbox deve acontecer (uma unica linha):', () => {
        it('1. backspace com a linha vazia', () => {
            const antes = '<div>|<br></div>';
            const depois = '<div>|<br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace com texto na linha cursor no inicio', () => {
            const antes = '<div>|texto</div>';
            const depois = '<div>|texto</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (duas linhas vazias):', () => {
        it('1. backspace na primeira linha', () => {
            const antes = '<div>|<br></div><div><br></div>';
            const depois = '<div>|<br></div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha', () => {
            const antes = '<div><br></div><div>|<br></div>';
            const depois = '<div>|<br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira linha com texto, segunda linha vazia):', () => {
        it('1. backspace na primeira linha com cursor no inicio', () => {
            const antes = '<div>|texto</div><div><br></div>';
            const depois = '<div>|texto</div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha', () => {
            const antes = '<div>texto</div><div>|<br></div>';
            const depois = '<div>texto|</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira linha vazia, segunda linha com texto):', () => {
        it('1. backspace na primeira linha', () => {
            const antes = '<div>|<br></div><div>texto</div>';
            const depois = '<div>|<br></div><div>texto</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha com cursor no inicio', () => {
            const antes = '<div><br></div><div>|texto</div>';
            const depois = '<div>|texto</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (duas linhas com texto):', () => {
        it('1. backspace na primeira linha com cursor no inicio', () => {
            const antes = '<div>|texto1</div><div>texto2</div>';
            const depois = '<div>|texto1</div><div>texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha com cursor no inicio', () => {
            const antes = '<div>texto1</div><div>|texto2</div>';
            const depois = '<div>texto1|texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (três linhas vazias):', () => {
        it('1. backspace na primeira linha', () => {
            const antes = '<div>|<br></div><div><br></div><div><br></div>';
            const depois = '<div>|<br></div><div><br></div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha', () => {
            const antes = '<div><br></div><div>|<br></div><div><br></div>';
            const depois = '<div>|<br></div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha', () => {
            const antes = '<div><br></div><div><br></div><div>|<br></div>';
            const depois = '<div><br></div><div>|<br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira linha com texto, segunda e terceira vazias):', () => {
        it('1. backspace na primeira linha com cursor no inicio', () => {
            const antes = '<div>|texto</div><div><br></div><div><br></div>';
            const depois = '<div>|texto</div><div><br></div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha', () => {
            const antes = '<div>texto</div><div>|<br></div><div><br></div>';
            const depois = '<div>texto|</div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha', () => {
            const antes = '<div>texto</div><div><br></div><div>|<br></div>';
            const depois = '<div>texto</div><div>|<br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira linha vazia, segunda linha com texto, terceira linha vazia):', () => {
        it('1. backspace na primeira linha', () => {
            const antes = '<div>|<br></div><div>texto</div><div><br></div>';
            const depois = '<div>|<br></div><div>texto</div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha com cursor no inicio', () => {
            const antes = '<div><br></div><div>|texto</div><div><br></div>';
            const depois = '<div>|texto</div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha', () => {
            const antes = '<div><br></div><div>texto</div><div>|<br></div>';
            const depois = '<div><br></div><div>texto|</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira e segunda linhas vazias, terceira linha com texto):', () => {
        it('1. backspace na primeira linha', () => {
            const antes = '<div>|<br></div><div><br></div><div>texto</div>';
            const depois = '<div>|<br></div><div><br></div><div>texto</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha', () => {
            const antes = '<div><br></div><div>|<br></div><div>texto</div>';
            const depois = '<div>|<br></div><div>texto</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha com cursor no inicio', () => {
            const antes = '<div><br></div><div><br></div><div>|texto</div>';
            const depois = '<div><br></div><div>|texto</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (três linhas com texto):', () => {
        it('1. backspace na primeira linha com cursor no inicio', () => {
            const antes = '<div>|texto1</div><div>texto2</div><div>texto3</div>';
            const depois = '<div>|texto1</div><div>texto2</div><div>texto3</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha com cursor no inicio', () => {
            const antes = '<div>texto1</div><div>|texto2</div><div>texto3</div>';
            const depois = '<div>texto1|texto2</div><div>texto3</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha com cursor no inicio', () => {
            const antes = '<div>texto1</div><div>texto2</div><div>|texto3</div>';
            const depois = '<div>texto1</div><div>texto2|texto3</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira linha com texto, segunda linha vazia, terceira linha com texto):', () => {
        it('1. backspace na primeira linha com cursor no inicio', () => {
            const antes = '<div>|texto1</div><div><br></div><div>texto2</div>';
            const depois = '<div>|texto1</div><div><br></div><div>texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha', () => {
            const antes = '<div>texto1</div><div>|<br></div><div>texto2</div>';
            const depois = '<div>texto1|</div><div>texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha com cursor no inicio', () => {
            const antes = '<div>texto1</div><div><br></div><div>|texto2</div>';
            const depois = '<div>texto1</div><div>|texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira linha vazia, segunda e terceira linhas com texto):', () => {
        it('1. backspace na primeira linha', () => {
            const antes = '<div>|<br></div><div>texto1</div><div>texto2</div>';
            const depois = '<div>|<br></div><div>texto1</div><div>texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha com cursor no inicio', () => {
            const antes = '<div><br></div><div>|texto1</div><div>texto2</div>';
            const depois = '<div>|texto1</div><div>texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha com cursor no inicio', () => {
            const antes = '<div><br></div><div>texto1</div><div>|texto2</div>';
            const depois = '<div><br></div><div>texto1|texto2</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
    describe('Ao pressionar backspace no textbox deve acontecer (primeira e segunda linhas com texto, terceira linha vazia):', () => {
        it('1. backspace na primeira linha com cursor no inicio', () => {
            const antes = '<div>|texto1</div><div>texto2</div><div><br></div>';
            const depois = '<div>|texto1</div><div>texto2</div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. backspace na segunda linha com cursor no inicio', () => {
            const antes = '<div>texto1</div><div>|texto2</div><div><br></div>';
            const depois = '<div>texto1|texto2</div><div><br></div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. backspace na terceira linha', () => {
            const antes = '<div>texto1</div><div>texto2</div><div>|<br></div>';
            const depois = '<div>texto1</div><div>texto2|</div>';
            setupHtmlAndCursor(antes);
            simulateBackspace();
            expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
    });
});
