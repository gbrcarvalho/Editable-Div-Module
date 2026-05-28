export type CaretType = 'Caret' | 'Range'

export interface ICaretPosition {
  node: Node,
  offset: number,
}

export interface ICursor {
  type: CaretType
  range: [ICaretPosition, ICaretPosition]
  deleteContents: () => void
  cloneContents: () => DocumentFragment
}

export class Cursor {
  static get(scope?: HTMLElement): ICursor {
    const s = window.getSelection()
    if (!s) throw new Error('Couldnt get the Selection object!')

    const { type: caretType } = s
    if (caretType == 'None') throw new Error('No selection')

    const range = s.getRangeAt(0)

    const { startContainer, startOffset, endContainer, endOffset } = range

    if (scope && (!(scope.contains(startContainer)) || !(scope.contains(startContainer)))) throw new Error('Cursor is outside the given scope')

    return {
      type: caretType as CaretType,
      range: [
        { node: startContainer, offset: startOffset },
        { node: endContainer, offset: endOffset }
      ],
      deleteContents: function() {
        range.deleteContents()
      },
      cloneContents: function() {
        return range.cloneContents()
      }
    }
  }

  static set(caret: [ICaretPosition, ICaretPosition?]) {
    const s = window.getSelection()
    if (!s) throw new Error('Couldnt get the Selection object!')

    const range = s.getRangeAt(0)

    const [start, end] = caret
    range.setStart(start.node, start.offset)

    if (end) {
      range.setEnd(end.node, end.offset)
    } else {
      range.setEnd(start.node, start.offset)
    }
  }
}

export class Caret {
  static get(scope?: HTMLElement): ICaretPosition {
    const s = window.getSelection()
    if (!s) throw new Error('Couldnt get the Selection object!')

    const { anchorNode, anchorOffset } = s
    if (!anchorNode) throw new Error('No caret on selection')

    if (scope && !(scope.contains(anchorNode))) throw new Error('Caret is outside the given scope')

    return {
      node: anchorNode,
      offset: anchorOffset,
    }
  }

  static getAll(scope?: HTMLElement): [ICaretPosition, ICaretPosition?] {
    const s = window.getSelection()
    if (!s) throw new Error('Couldnt get the Selection object!')

    const { type } = s
    if (type == 'None') throw new Error('No selection')

    const { anchorNode, anchorOffset, focusNode, focusOffset } = s
    if (!anchorNode || !focusNode) throw new Error('No caret on selection')

    if (scope && (!(scope.contains(anchorNode)) || !(scope.contains(focusNode)))) throw new Error('Caret is outside the given scope')

    if (type == 'Caret') {
      return [
        { node: anchorNode, offset: anchorOffset }
      ]
    } else {
      return [
        { node: anchorNode, offset: anchorOffset },
        { node: focusNode, offset: focusOffset }
      ]
    }
  }

  static getXY() {
  }

  static set({ node, offset }: ICaretPosition) {
    const s = window.getSelection()
    if (!s) throw new Error('Couldnt get the Selection object!')

    s.setPosition(node, offset)
  }
}
