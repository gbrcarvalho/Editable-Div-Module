/** @jest-environment jsdom */

import { Cursor } from '../../../../utils/selection'
import { splitLineOnCaret, splitLineOnRange } from './default-enter-behavior'

const enterHandler = (ev: KeyboardEvent) => {
  if (ev.key != 'Enter') return

  const cursor = Cursor.get()
  const [start, end] = cursor.range
  const type = cursor.type

  if (type == 'Range') {
    ev.preventDefault()
    if (ev.shiftKey) return
    splitLineOnRange(cursor.range)
  } else {
    ev.preventDefault()
    if (ev.shiftKey) return
    splitLineOnCaret(start)
  }
}

describe('Editable Div - Enter keydown behavior', () => {
  let editable: HTMLElement;

  beforeEach(() => {
    editable = document.createElement('div');
    //editable.contentEditable = 'true'
    editable.setAttribute('contenteditable', '')
    editable.addEventListener('keydown', enterHandler)

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
      // Remove o marcador de cursor '|' do nó de texto
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
      // Remove o marcador de cursor '|' do nó de texto
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
      // Remove o marcador de cursor '|' do nó de texto
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

  function simulateEnter() {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      bubbles: true,
      cancelable: true,
    });
    editable.dispatchEvent(event);
  }

  function getExpectedHtml(htmlWithCursor: string): string {
    return htmlWithCursor.replace(/\|/g, '');
  }

  describe('Ao pressionar enter no textbox deve acontecer (uma unica linha):', () => {
    it('1. enter com a linha vazia', () => {
      const antes = '<div>|<br></div>';
      const depois = '<div><br></div><div>|<br></div>';

      setupHtmlAndCursor(antes);
      simulateEnter();

      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('2. enter com texto na linha cursor no inicio', () => {
      const antes = '<div>|texto</div>';
      const depois = '<div><br></div><div>|texto</div>';

      setupHtmlAndCursor(antes);
      simulateEnter();

      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('3. enter com texto na linha cursor no meio', () => {
      const antes = '<div>tex|to</div>';
      const depois = '<div>tex</div><div>|to</div>';

      setupHtmlAndCursor(antes);
      simulateEnter();

      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });

    it('4. enter com texto na linha cursor no final', () => {
      const antes = '<div>texto|</div>';
      const depois = '<div>texto</div><div>|<br></div>';

      setupHtmlAndCursor(antes);
      simulateEnter();

      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (duas linhas com texto):', () => {
    it('1. enter na primeira linha com cursor no inicio', () => {
      const antes = '<div>|texto1</div><div>texto2</div>';
      const depois = '<div><br></div><div>|texto1</div><div>texto2</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na primeira linha com cursor no meio', () => {
      const antes = '<div>tex|to1</div><div>texto2</div>';
      const depois = '<div>tex</div><div>|to1</div><div>texto2</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na primeira linha com cursor no fim', () => {
      const antes = '<div>texto1|</div><div>texto2</div>';
      const depois = '<div>texto1</div><div>|<br></div><div>texto2</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha com cursor no inicio', () => {
      const antes = '<div>texto1</div><div>|texto2</div>';
      const depois = '<div>texto1</div><div><br></div><div>|texto2</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na segunda linha com cursor no meio', () => {
      const antes = '<div>texto1</div><div>tex|to2</div>';
      const depois = '<div>texto1</div><div>tex</div><div>|to2</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('6. enter na segunda linha com cursor no fim', () => {
      const antes = '<div>texto1</div><div>texto2|</div>';
      const depois = '<div>texto1</div><div>texto2</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (duas linhas vazias):', () => {
    it('1. enter na primeira linha', () => {
      const antes = '<div>|<br></div><div><br></div>';
      const depois = '<div><br></div><div>|<br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na segunda linha', () => {
      const antes = '<div><br></div><div>|<br></div>';
      const depois = '<div><br></div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (primeira linha com texto e segunda linha vazia):', () => {
    it('1. enter na primeira linha com cursor no inicio', () => {
      const antes = '<div>|texto</div><div><br></div>';
      const depois = '<div><br></div><div>|texto</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na primeira linha com cursor no meio', () => {
      const antes = '<div>tex|to</div><div><br></div>';
      const depois = '<div>tex</div><div>|to</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na primeira linha com cursor no fim', () => {
      const antes = '<div>texto|</div><div><br></div>';
      const depois = '<div>texto</div><div>|<br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha', () => {
      const antes = '<div>texto</div><div>|<br></div>';
      const depois = '<div>texto</div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (primeira linha vazia e segunda linha com texto):', () => {
    it('1. enter na primeira linha', () => {
      const antes = '<div>|<br></div><div>texto</div>';
      const depois = '<div><br></div><div>|<br></div><div>texto</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na segunda linha cursor no inicio', () => {
      const antes = '<div><br></div><div>|texto</div>';
      const depois = '<div><br></div><div><br></div><div>|texto</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na segunda linha cursor no meio', () => {
      const antes = '<div><br></div><div>tex|to</div>';
      const depois = '<div><br></div><div>tex</div><div>|to</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha cursor no fim', () => {
      const antes = '<div><br></div><div>texto|</div>';
      const depois = '<div><br></div><div>texto</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (três linhas vazias):', () => {
    it('1. enter na primeira linha', () => {
      const antes = '<div>|<br></div><div><br></div><div><br></div>';
      const depois = '<div><br></div><div>|<br></div><div><br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na segunda linha', () => {
      const antes = '<div><br></div><div>|<br></div><div><br></div>';
      const depois = '<div><br></div><div><br></div><div>|<br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na terceira linha', () => {
      const antes = '<div><br></div><div><br></div><div>|<br></div>';
      const depois = '<div><br></div><div><br></div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (primeira linha com texto, segunda e terceira linhas vazias):', () => {
    it('1. enter na primeira linha com cursor no inicio', () => {
      const antes = '<div>|texto</div><div><br></div><div><br></div>';
      const depois = '<div><br></div><div>|texto</div><div><br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na primeira linha com cursor no meio', () => {
      const antes = '<div>tex|to</div><div><br></div><div><br></div>';
      const depois = '<div>tex</div><div>|to</div><div><br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na primeira linha com cursor no fim', () => {
      const antes = '<div>texto|</div><div><br></div><div><br></div>';
      const depois = '<div>texto</div><div>|<br></div><div><br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha', () => {
      const antes = '<div>texto</div><div>|<br></div><div><br></div>';
      const depois = '<div>texto</div><div><br></div><div>|<br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na terceira linha', () => {
      const antes = '<div>texto</div><div><br></div><div>|<br></div>';
      const depois = '<div>texto</div><div><br></div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (segunda linha com texto, primeira e terceira linhas vazias):', () => {
    it('1. enter na primeira linha', () => {
      const antes = '<div>|<br></div><div>texto</div><div><br></div>';
      const depois = '<div><br></div><div>|<br></div><div>texto</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na segunda linha com cursor no inicio', () => {
      const antes = '<div><br></div><div>|texto</div><div><br></div>';
      const depois = '<div><br></div><div><br></div><div>|texto</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na segunda linha com cursor no meio', () => {
      const antes = '<div><br></div><div>tex|to</div><div><br></div>';
      const depois = '<div><br></div><div>tex</div><div>|to</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha com cursor no fim', () => {
      const antes = '<div><br></div><div>texto|</div><div><br></div>';
      const depois = '<div><br></div><div>texto</div><div>|<br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na terceira linha', () => {
      const antes = '<div><br></div><div>texto</div><div>|<br></div>';
      const depois = '<div><br></div><div>texto</div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (terceira linha com texto, primeira e segunda linhas vazias):', () => {
    it('1. enter na primeira linha', () => {
      const antes = '<div>|<br></div><div><br></div><div>texto</div>';
      const depois = '<div><br></div><div>|<br></div><div><br></div><div>texto</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na segunda linha', () => {
      const antes = '<div><br></div><div>|<br></div><div>texto</div>';
      const depois = '<div><br></div><div><br></div><div>|<br></div><div>texto</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na terceira linha com cursor no inicio', () => {
      const antes = '<div><br></div><div><br></div><div>|texto</div>';
      const depois = '<div><br></div><div><br></div><div><br></div><div>|texto</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na terceira linha com cursor no meio', () => {
      const antes = '<div><br></div><div><br></div><div>tex|to</div>';
      const depois = '<div><br></div><div><br></div><div>tex</div><div>|to</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na terceira linha com cursor no fim', () => {
      const antes = '<div><br></div><div><br></div><div>texto|</div>';
      const depois = '<div><br></div><div><br></div><div>texto</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (primeira e segunda linhas com texto, terceira linha vazia):', () => {
    it('1. enter na primeira linha com cursor no inicio', () => {
      const antes = '<div>|texto1</div><div>texto2</div><div><br></div>';
      const depois = '<div><br></div><div>|texto1</div><div>texto2</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na primeira linha com cursor no meio', () => {
      const antes = '<div>tex|to1</div><div>texto2</div><div><br></div>';
      const depois = '<div>tex</div><div>|to1</div><div>texto2</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na primeira linha com cursor no fim', () => {
      const antes = '<div>texto1|</div><div>texto2</div><div><br></div>';
      const depois = '<div>texto1</div><div>|<br></div><div>texto2</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha com cursor no inicio', () => {
      const antes = '<div>texto1</div><div>|texto2</div><div><br></div>';
      const depois = '<div>texto1</div><div><br></div><div>|texto2</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na segunda linha com cursor no meio', () => {
      const antes = '<div>texto1</div><div>tex|to2</div><div><br></div>';
      const depois = '<div>texto1</div><div>tex</div><div>|to2</div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('6. enter na segunda linha com cursor no fim', () => {
      const antes = '<div>texto1</div><div>texto2|</div><div><br></div>';
      const depois = '<div>texto1</div><div>texto2</div><div>|<br></div><div><br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('7. enter na terceira linha', () => {
      const antes = '<div>texto1</div><div>texto2</div><div>|<br></div>';
      const depois = '<div>texto1</div><div>texto2</div><div><br></div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (primeira e terceira linhas com texto, segunda linha vazia):', () => {
    it('1. enter na primeira linha com cursor no inicio', () => {
      const antes = '<div>|texto1</div><div><br></div><div>texto3</div>';
      const depois = '<div><br></div><div>|texto1</div><div><br></div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na primeira linha com cursor no meio', () => {
      const antes = '<div>tex|to1</div><div><br></div><div>texto3</div>';
      const depois = '<div>tex</div><div>|to1</div><div><br></div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na primeira linha com cursor no fim', () => {
      const antes = '<div>texto1|</div><div><br></div><div>texto3</div>';
      const depois = '<div>texto1</div><div>|<br></div><div><br></div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha', () => {
      const antes = '<div>texto1</div><div>|<br></div><div>texto3</div>';
      const depois = '<div>texto1</div><div><br></div><div>|<br></div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na terceira linha com cursor no inicio', () => {
      const antes = '<div>texto1</div><div><br></div><div>|texto3</div>';
      const depois = '<div>texto1</div><div><br></div><div><br></div><div>|texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('6. enter na terceira linha com cursor no meio', () => {
      const antes = '<div>texto1</div><div><br></div><div>tex|to3</div>';
      const depois = '<div>texto1</div><div><br></div><div>tex</div><div>|to3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('7. enter na terceira linha com cursor no fim', () => {
      const antes = '<div>texto1</div><div><br></div><div>texto3|</div>';
      const depois = '<div>texto1</div><div><br></div><div>texto3</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (segunda e terceira linhas com texto, primeira linha vazia):', () => {
    it('1. enter na primeira linha', () => {
      const antes = '<div>|<br></div><div>texto2</div><div>texto3</div>';
      const depois = '<div><br></div><div>|<br></div><div>texto2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na segunda linha com cursor no inicio', () => {
      const antes = '<div><br></div><div>|texto2</div><div>texto3</div>';
      const depois = '<div><br></div><div><br></div><div>|texto2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na segunda linha com cursor no meio', () => {
      const antes = '<div><br></div><div>tex|to2</div><div>texto3</div>';
      const depois = '<div><br></div><div>tex</div><div>|to2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha com cursor no fim', () => {
      const antes = '<div><br></div><div>texto2|</div><div>texto3</div>';
      const depois = '<div><br></div><div>texto2</div><div>|<br></div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na terceira linha com cursor no inicio', () => {
      const antes = '<div><br></div><div>texto2</div><div>|texto3</div>';
      const depois = '<div><br></div><div>texto2</div><div><br></div><div>|texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('6. enter na terceira linha com cursor no meio', () => {
      const antes = '<div><br></div><div>texto2</div><div>tex|to3</div>';
      const depois = '<div><br></div><div>texto2</div><div>tex</div><div>|to3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('7. enter na terceira linha com cursor no fim', () => {
      const antes = '<div><br></div><div>texto2</div><div>texto3|</div>';
      const depois = '<div><br></div><div>texto2</div><div>texto3</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (três linhas com texto):', () => {
    it('1. enter na primeira linha com cursor no inicio', () => {
      const antes = '<div>|texto1</div><div>texto2</div><div>texto3</div>';
      const depois = '<div><br></div><div>|texto1</div><div>texto2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('2. enter na primeira linha com cursor no meio', () => {
      const antes = '<div>tex|to1</div><div>texto2</div><div>texto3</div>';
      const depois = '<div>tex</div><div>|to1</div><div>texto2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('3. enter na primeira linha com cursor no fim', () => {
      const antes = '<div>texto1|</div><div>texto2</div><div>texto3</div>';
      const depois = '<div>texto1</div><div>|<br></div><div>texto2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('4. enter na segunda linha com cursor no inicio', () => {
      const antes = '<div>texto1</div><div>|texto2</div><div>texto3</div>';
      const depois = '<div>texto1</div><div><br></div><div>|texto2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('5. enter na segunda linha com cursor no meio', () => {
      const antes = '<div>texto1</div><div>tex|to2</div><div>texto3</div>';
      const depois = '<div>texto1</div><div>tex</div><div>|to2</div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('6. enter na segunda linha com cursor no fim', () => {
      const antes = '<div>texto1</div><div>texto2|</div><div>texto3</div>';
      const depois = '<div>texto1</div><div>texto2</div><div>|<br></div><div>texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('7. enter na terceira linha com cursor no inicio', () => {
      const antes = '<div>texto1</div><div>texto2</div><div>|texto3</div>';
      const depois = '<div>texto1</div><div>texto2</div><div><br></div><div>|texto3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('8. enter na terceira linha com cursor no meio', () => {
      const antes = '<div>texto1</div><div>texto2</div><div>tex|to3</div>';
      const depois = '<div>texto1</div><div>texto2</div><div>tex</div><div>|to3</div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
    it('9. enter na terceira linha com cursor no fim', () => {
      const antes = '<div>texto1</div><div>texto2</div><div>texto3|</div>';
      const depois = '<div>texto1</div><div>texto2</div><div>texto3</div><div>|<br></div>';
      setupHtmlAndCursor(antes);
      simulateEnter();
      expect(editable.innerHTML).toBe(getExpectedHtml(depois));
    });
  });

  describe('Ao pressionar enter no textbox deve acontecer (seleção não colapsada):', () => {
    describe('seleção contida numa única linha:', () => {
      it('1. seleção parcial da linha', () => {
        const antes = '<div>t|ext|o</div>';
        const depois = '<div>t</div><div>|o</div>';
        setupHtmlAndCursor2(antes);
        simulateEnter();
        expect(editable.innerHTML).toBe(getExpectedHtml(depois));
      });
      it('2. seleção da linha inteira', () => {
        const antes = '<div>|texto|</div>';
        const depois = '<div><br></div><div>|<br></div>';
        setupHtmlAndCursor2(antes);
        simulateEnter();
        expect(editable.innerHTML).toBe(getExpectedHtml(depois));
      });
    });

    describe('seleção começando em uma linha e terminando em outra:', () => {
      it('3. duas linhas inteiras selecionadas', () => {
        const antes = '<div>|texto</div><div>texto|</div>';
        const depois = '<div><br></div><div>|<br></div>';
        setupHtmlAndCursor2(antes);
        simulateEnter();
        expect(editable.innerHTML).toBe(getExpectedHtml(depois));
      });
      it('4. parcialmente a primeira linha e a segunda linha inteira', () => {
        const antes = '<div>tex|to</div><div>texto|</div>';
        const depois = '<div>tex</div><div>|<br></div>';
        setupHtmlAndCursor2(antes);
        simulateEnter();
        expect(editable.innerHTML).toBe(getExpectedHtml(depois));
      });
      it('5. primeira linha inteira e parcialmente a segunda linha', () => {
        const antes = '<div>|texto</div><div>tex|to</div>';
        const depois = '<div><br></div><div>|to</div>';
        setupHtmlAndCursor2(antes);
        simulateEnter();
        expect(editable.innerHTML).toBe(getExpectedHtml(depois));
      });
      it('6. parcialmente a primeira linha e parcialmente a segunda linha', () => {
        const antes = '<div>tex|to</div><div>tex|to</div>';
        const depois = '<div>tex</div><div>|to</div>';
        setupHtmlAndCursor2(antes);
        simulateEnter();
        expect(editable.innerHTML).toBe(getExpectedHtml(depois));
      });
    });

    describe('Ao pressionar enter no editable deve acontecer (seleção não colapsada, três linhas):', () => {
      describe('seleção começando na primeira linha e terminando na terceira:', () => {
        it('1. três linhas inteiras selecionadas', () => {
          const antes = '<div>|texto1</div><div>texto2</div><div>texto3|</div>';
          const depois = '<div><br></div><div>|<br></div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('2. parcialmente a primeira linha, segunda inteira e terceira inteira', () => {
          const antes = '<div>tex|to1</div><div>texto2</div><div>texto3|</div>';
          const depois = '<div>tex</div><div>|<br></div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('3. primeira linha inteira, segunda inteira e terceira parcialmente', () => {
          const antes = '<div>|texto1</div><div>texto2</div><div>tex|to3</div>';
          const depois = '<div><br></div><div>|to3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('4. parcialmente a primeira linha, segunda inteira e terceira parcialmente', () => {
          const antes = '<div>tex|to1</div><div>texto2</div><div>tex|to3</div>';
          const depois = '<div>tex</div><div>|to3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
      });

      describe('seleção começando na primeira linha e terminando na segunda (terceira intocada):', () => {
        it('5. primeira linha inteira e segunda inteira', () => {
          const antes = '<div>|texto1</div><div>texto2|</div><div>texto3</div>';
          const depois = '<div><br></div><div>|<br></div><div>texto3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('6. parcialmente a primeira linha e segunda inteira', () => {
          const antes = '<div>tex|to1</div><div>texto2|</div><div>texto3</div>';
          const depois = '<div>tex</div><div>|<br></div><div>texto3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('7. primeira linha inteira e segunda parcialmente', () => {
          const antes = '<div>|texto1</div><div>tex|to2</div><div>texto3</div>';
          const depois = '<div><br></div><div>|to2</div><div>texto3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('8. parcialmente a primeira linha e segunda parcialmente', () => {
          const antes = '<div>tex|to1</div><div>tex|to2</div><div>texto3</div>';
          const depois = '<div>tex</div><div>|to2</div><div>texto3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
      });

      describe('seleção começando na segunda linha e terminando na terceira (primeira intocada):', () => {
        it('9. segunda linha inteira e terceira inteira', () => {
          const antes = '<div>texto1</div><div>|texto2</div><div>texto3|</div>';
          const depois = '<div>texto1</div><div><br></div><div>|<br></div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('10. segunda linha inteira e terceira parcialmente', () => {
          const antes = '<div>texto1</div><div>|texto2</div><div>tex|to3</div>';
          const depois = '<div>texto1</div><div><br></div><div>|to3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('11. segunda linha parcialmente e terceira inteira', () => {
          const antes = '<div>texto1</div><div>tex|to2</div><div>texto3|</div>';
          const depois = '<div>texto1</div><div>tex</div><div>|<br></div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
        it('12. segunda linha parcialmente e terceira parcialmente', () => {
          const antes = '<div>texto1</div><div>tex|to2</div><div>tex|to3</div>';
          const depois = '<div>texto1</div><div>tex</div><div>|to3</div>';
          setupHtmlAndCursor2(antes);
          simulateEnter();
          expect(editable.innerHTML).toBe(getExpectedHtml(depois));
        });
      });
    });
  });
});
