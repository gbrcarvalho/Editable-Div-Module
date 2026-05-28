/** @jest-environment jsdom */

import { Caret } from '../../../../utils/selection';
import { mergeForward } from './default-delete-behavior';

const deleteHandler = () => {
  mergeForward(Caret.get())
}

describe('Editable Div - Delete keydown behavior', () => {
  let editable: HTMLElement;

  beforeEach(() => {
    editable = document.createElement('div');
    //editable.contentEditable = 'true'
    editable.setAttribute('contenteditable', '')
    editable.addEventListener('keydown', deleteHandler)
    document.body.appendChild(editable);
    editable.focus();
  });

  afterEach(() => {
    document.body.removeChild(editable);
    jest.clearAllMocks();
  });

  function setupHtmlAndCursor(htmlWithCursor: string) {
    editable.innerHTML = htmlWithCursor;
    const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT, null);
    let node: Text | null = null;
    let foundNode: Text | null = null;
    let offset = -1;
    while ((node = walker.nextNode() as Text)) {
      const idx = node.nodeValue?.indexOf('|');
      if (idx !== undefined && idx !== -1) {
        foundNode = node;
        offset = idx;
        break;
      }
    }
    if (foundNode) {
      foundNode.nodeValue = foundNode.nodeValue!.replace('|', '');
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(foundNode, offset);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  function simulateDelete() {
    const event = new KeyboardEvent('keydown', {
      key: 'Delete',
      code: 'Delete',
      keyCode: 46,
      bubbles: true,
      cancelable: true,
    });
    editable.dispatchEvent(event);
  }

  function getExpectedHtml(htmlWithCursor: string): string {
    return htmlWithCursor.replace(/\|/g, '');
  }

  describe('Ao pressionar delete no textbox deve acontecer (uma unica linha):', () => {
    it('1. delete com a linha vazia', () => {
      const antes = '<div>|<br></div>';
      const depois = '<div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete com texto na linha cursor no final', () => {
      const antes = '<div>texto|</div>';
      const depois = '<div>texto|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (duas linhas vazias):', () => {
    it('1. delete na primeira linha', () => {
      const antes = '<div>|<br></div><div><br></div>';
      const depois = '<div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha', () => {
      const antes = '<div><br></div><div>|<br></div>';
      const depois = '<div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira linha com texto, segunda linha vazia):', () => {
    it('1. delete na primeira linha com cursor no final', () => {
      const antes = '<div>texto|</div><div><br></div>';
      const depois = '<div>texto|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha', () => {
      const antes = '<div>texto</div><div>|<br></div>';
      const depois = '<div>texto</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira linha vazia, segunda linha com texto):', () => {
    it('1. delete na primeira linha', () => {
      const antes = '<div>|<br></div><div>texto</div>';
      const depois = '<div>|texto</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha com cursor no final', () => {
      const antes = '<div><br></div><div>texto|</div>';
      const depois = '<div><br></div><div>texto|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (duas linhas com texto):', () => {
    it('1. delete na primeira linha com cursor no final', () => {
      const antes = '<div>texto1|</div><div>texto2</div>';
      const depois = '<div>texto1|texto2</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha com cursor no final', () => {
      const antes = '<div>texto1</div><div>texto2|</div>';
      const depois = '<div>texto1</div><div>texto2|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (três linhas vazias):', () => {
    it('1. delete na primeira linha', () => {
      const antes = '<div>|<br></div><div><br></div><div><br></div>';
      const depois = '<div>|<br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha', () => {
      const antes = '<div><br></div><div>|<br></div><div><br></div>';
      const depois = '<div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha', () => {
      const antes = '<div><br></div><div><br></div><div>|<br></div>';
      const depois = '<div><br></div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira linha com texto, segunda e terceira vazias):', () => {
    it('1. delete na primeira linha com cursor no final', () => {
      const antes = '<div>texto|</div><div><br></div><div><br></div>';
      const depois = '<div>texto|</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha', () => {
      const antes = '<div>texto</div><div>|<br></div><div><br></div>';
      const depois = '<div>texto</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha', () => {
      const antes = '<div>texto</div><div><br></div><div>|<br></div>';
      const depois = '<div>texto</div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira linha vazia, segunda linha com texto, terceira linha vazia):', () => {
    it('1. delete na primeira linha', () => {
      const antes = '<div>|<br></div><div>texto</div><div><br></div>';
      const depois = '<div>|texto</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha com cursor no final', () => {
      const antes = '<div><br></div><div>texto|</div><div><br></div>';
      const depois = '<div><br></div><div>texto|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha', () => {
      const antes = '<div><br></div><div>texto</div><div>|<br></div>';
      const depois = '<div><br></div><div>texto</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira e segunda linhas vazias, terceira linha com texto):', () => {
    it('1. delete na primeira linha', () => {
      const antes = '<div>|<br></div><div><br></div><div>texto</div>';
      const depois = '<div>|<br></div><div>texto</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha', () => {
      const antes = '<div><br></div><div>|<br></div><div>texto</div>';
      const depois = '<div><br></div><div>|texto</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha com cursor no final', () => {
      const antes = '<div><br></div><div><br></div><div>texto|</div>';
      const depois = '<div><br></div><div><br></div><div>texto|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (três linhas com texto):', () => {
    it('1. delete na primeira linha com cursor no final', () => {
      const antes = '<div>texto1|</div><div>texto2</div><div>texto3</div>';
      const depois = '<div>texto1|texto2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha com cursor no final', () => {
      const antes = '<div>texto1</div><div>texto2|</div><div>texto3</div>';
      const depois = '<div>texto1</div><div>texto2|texto3</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha com cursor no final', () => {
      const antes = '<div>texto1</div><div>texto2</div><div>texto3|</div>';
      const depois = '<div>texto1</div><div>texto2</div><div>texto3|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira linha com texto, segunda linha vazia, terceira linha com texto):', () => {
    it('1. delete na primeira linha com cursor no final', () => {
      const antes = '<div>texto1|</div><div><br></div><div>texto2</div>';
      const depois = '<div>texto1|</div><div>texto2</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha', () => {
      const antes = '<div>texto1</div><div>|<br></div><div>texto2</div>';
      const depois = '<div>texto1</div><div>|texto2</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha com cursor no final', () => {
      const antes = '<div>texto1</div><div><br></div><div>texto2|</div>';
      const depois = '<div>texto1</div><div><br></div><div>texto2|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira linha vazia, segunda e terceira linhas com texto):', () => {
    it('1. delete na primeira linha', () => {
      const antes = '<div>|<br></div><div>texto1</div><div>texto2</div>';
      const depois = '<div>|texto1</div><div>texto2</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha com cursor no final', () => {
      const antes = '<div><br></div><div>texto1|</div><div>texto2</div>';
      const depois = '<div><br></div><div>texto1|texto2</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha com cursor no final', () => {
      const antes = '<div><br></div><div>texto1</div><div>texto2|</div>';
      const depois = '<div><br></div><div>texto1</div><div>texto2|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar delete no textbox deve acontecer (primeira e segunda linhas com texto, terceira linha vazia):', () => {
    it('1. delete na primeira linha com cursor no final', () => {
      const antes = '<div>texto1|</div><div>texto2</div><div><br></div>';
      const depois = '<div>texto1|texto2</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. delete na segunda linha com cursor no final', () => {
      const antes = '<div>texto1</div><div>texto2|</div><div><br></div>';
      const depois = '<div>texto1</div><div>texto2|</div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. delete na terceira linha', () => {
      const antes = '<div>texto1</div><div>texto2</div><div>|<br></div>';
      const depois = '<div>texto1</div><div>texto2</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateDelete();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });
});
