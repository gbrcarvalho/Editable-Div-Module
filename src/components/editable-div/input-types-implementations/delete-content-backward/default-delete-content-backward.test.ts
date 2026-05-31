/** @jest-environment jsdom */

import { EditableDiv, EditableDivElement } from "../../editable-div";

describe('Editable Div - Backspace keydown behavior', () => {
  let editable: EditableDivElement

  beforeEach(() => {
    editable = EditableDiv.create()
    editable.setup()
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

  function setupHtmlAndCursor2(htmlWithCursor: string) {
    editable.innerHTML = htmlWithCursor

    const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT, null)
    let node: Text | null = null
    let foundNodes: Text[] = []
    let offsets: number[] = []

    while ((node = walker.nextNode() as Text)) {
      let idx: number | undefined = node.nodeValue?.indexOf('|')
      let sameNode: number = 0
      while (idx != undefined && idx !== -1) {
        foundNodes.push(node)
        if (sameNode > 0) {
          offsets.push(idx - offsets.length)
        } else {
          offsets.push(idx)
        }
        idx = node.nodeValue?.indexOf('|', idx + 1)
        sameNode++
      }
    }

    if (foundNodes.length == 1) {
      const foundNode = foundNodes[0]
      const offset = offsets[0]
      foundNode.nodeValue = foundNode.nodeValue!.replace('|', '')

      const selection = window.getSelection()
      const range = document.createRange()
      range.setStart(foundNode, offset)
      range.collapse(true)
      selection?.removeAllRanges()
      selection?.addRange(range)
    } else if (foundNodes.length == 2) {
      const [startNode, endNode] = foundNodes
      const [startOffset, endOffset] = offsets
      startNode.nodeValue = startNode.nodeValue!.replace('|', '')
      endNode.nodeValue = endNode.nodeValue!.replace('|', '')

      const selection = window.getSelection()
      const range = document.createRange()
      range.setStart(startNode, startOffset)
      range.setEnd(endNode, endOffset)
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  function simulateBackspace() {
    const event = new InputEvent('beforeinput', {
      bubbles: true,
      cancelable: true,
      inputType: 'deleteContentBackward',
    });
    editable.dispatchEvent(event);
  }

  function getExpectedHtml(htmlWithCursor: string): string {
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

    /* TODO: dar um jeito de manter esse teste
     * por que ele não passa no jest por conta de não ser possível disparar o comportamento
     * default do browser, mas é importante lembrar que esse comportamento tem que ocorrer
     * dentro dessas circunstancias.
    it('3. backspace com texto na linha cursor no offset 1 com texto apos o cursor', () => {
      const antes = '<div>t|exto</div>';
      const depois = '<div>|exto</div>';
      setupHtmlAndCursor(antes);
      simulateBackspace();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    */

    it('4. backspace com texto na linha cursor no offset 1 sem texto apos o cursor', () => {
      const antes = '<div>t|</div>';
      const depois = '<div><br></div>';
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

  describe('Ao pressionar backspace no textbox deve acontecer: cursor não colapsado uma linha:', () => {
    it('1. backspace na primeira linha com toda a palavra selecionada', () => {
      const antes = '<div>|texto1|</div>';
      const depois = '<div><br></div>';
      setupHtmlAndCursor2(antes);
      simulateBackspace();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

});
