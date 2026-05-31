import { ICursorState, } from './editable-div'
import { closest } from '../../utils/helpers'

export type InputType =
  'insertText' |
  'insertParagraph' |
  'insertLineBreak' |
  'insertFromPaste' |
  'insertFromDrop' |
  'deleteContentBackward' |
  'deleteContentForward' |
  'deleteWordBackward' |
  'deleteWordForward' |
  'deleteSoftLineBackward' |
  'deleteByCut' |
  'deleteByDrag' |
  'historyUndo' |
  'historyRedo'

export type HandlerFunction = (ev: Event, cursor: ICursorState) => void
export interface IInputHandlers extends Partial<Record<InputType & string, HandlerFunction>> { }

// TODO: os comandos podem receber o objeto IBlockType, com os metodos para realizar as ações
let textBlockHandlers: IInputHandlers = {
  insertParagraph(ev, cursor) {
    const type = cursor.type

    if (type == 'Range') {
      ev.preventDefault()
      TextBlock.splitLineOnRange(cursor)
      return
    }

    ev.preventDefault()
    TextBlock.splitLineOnCaret(cursor)
  },

  deleteContentBackward(ev, cursor) {
    const { node, offset } = cursor.from

    if (cursor.type == 'Caret' && offset == 0) {
      ev.preventDefault()
      TextBlock.mergeBackward(cursor)
    } else if (offset == 1 && offset == node.textContent!.length) {
      ev.preventDefault()
      const parent = node.parentElement as HTMLElement
      const newNode = parent.cloneNode() as HTMLElement
      newNode.innerHTML = '<br>'
        ; (parent as ChildNode).replaceWith(newNode)

      cursor.set({ node: newNode, offset: 0 })
    } else if (
      cursor.type == 'Range' &&
      cursor.from.node == cursor.to.node &&
      cursor.from.node.textContent!.length == cursor.to.offset &&
      cursor.from.offset == 0
    ) {
      ev.preventDefault()
      const parent = node.parentElement as HTMLElement
      parent.innerHTML = '<br>'

      cursor.set({ node: parent, offset: 0 })
    }
  },

  // TODO: deleteWordBackward para não apagar o bloco-base
  // TODO: deleteSoftLineBackward para não apagar o bloco-base
  // TODO: deleteByCut para não apagar o bloco base
  // TODO: ou implementar uma função de recover para nunca perder o bloco-base --fallback--

  deleteContentForward(ev, cursor) {
    const { node, offset } = cursor.from

    if (cursor.type == 'Caret' && offset == (node.textContent ?? '').length) {
      ev.preventDefault()
      TextBlock.mergeForward(cursor)
    } else if (
      cursor.type == 'Range' &&
      cursor.from.node == cursor.to.node &&
      cursor.from.node.textContent!.length == cursor.to.offset &&
      cursor.from.offset == 0
    ) {
      ev.preventDefault()
      const parent = node.parentElement as HTMLElement
      parent.innerHTML = '<br>'

      cursor.set({ node: parent, offset: 0 })
    }

  },

  insertLineBreak(ev, cursor) {
    ev.preventDefault()
  },
  insertFromDrop(ev, cursor) {
    ev.preventDefault()
  },
  // TODO: terminar os testes para insertFromPaste
  insertFromPaste(ev, cursor) {
    if (!(ev instanceof InputEvent)) return
    ev.preventDefault()

    const text = ev.dataTransfer?.getData('text/plain')
    console.log('handler running inputType: ', ev)
    console.log('text: ', text)
    if (!text) return

    // transforma o texto em <linhas>
    const lines = Line.createMany(text)
    if (lines.length == 0) return

    // busca a linha onde o caret está
    const { node: initialNode, offset: initialOffset } = cursor.from
    const initialLine = Line.isLine(initialNode) ? initialNode : closest(initialNode, Line.isLine)
    if (!Line.isLine(initialLine)) throw new Error(`should be line: ${initialLine}`)

    const [beforeCaret, afterCaret] = Line.split(initialLine, initialOffset)

    let merged: HTMLDivElement

    // uma linha
    if (lines.length == 1) {
      merged = Line.merge([beforeCaret, lines[0]])
      const offset = merged.textContent.length
      merged = Line.merge([merged, afterCaret])
      initialLine.replaceWith(merged)
      cursor.set({ node: merged.firstChild!, offset })
    } else { // mais de uma linha
      const firstMerge = Line.merge([beforeCaret, lines[0]])
      const lastMerge = Line.merge([lines[lines.length - 1], afterCaret])

      initialLine.replaceWith(firstMerge)
      let after = firstMerge
      for (let i = 1; i < lines.length - 1; i++) {
        after.insertAdjacentElement('afterend', lines[i])
        after = lines[i]
      }

      const offset = lines[lines.length - 1].textContent.length
      after.insertAdjacentElement('afterend', lastMerge)
      cursor.set({ node: lastMerge.firstChild!, offset })
    }

    return
  },
  historyUndo(ev, cursor) {
    ev.preventDefault()
  },
  historyRedo(ev, cursor) {
    ev.preventDefault()
  }
}

export interface IBlockType {
  name: string
  create: (content?: string) => HTMLElement
  handlers: IInputHandlers
}

export type Block = HTMLElement & {
  textContent: string,
  firstChild: ChildNode | HTMLBRElement
}

export type EmptyBlock = HTMLElement & {
  textContent: '',
  innerHTML: '<br>'
  firstChild: HTMLBRElement
  firstChildElement: HTMLBRElement
}

export type ChildBlock = Block & {
  textContent: string,
  firstChild: ChildNode | HTMLBRElement
  parentElement: HTMLElement & {
    contentEditable: 'true'
  }
}

const nbsp = '\u00a0'

// TODO: Renomear para DefaultBlock
// TODO: Inicialmente não é aceito elementos aninhados, com ressalva para o único caso de um bloco completamente vazio
// <div><br></br>
export class TextBlock {
  static blockName: 'default'

  static set handlers(inputHandlers: IInputHandlers) {
    textBlockHandlers = inputHandlers
  }

  static get handlers() {
    return textBlockHandlers
  }

  // TODO: Consertar essa lógica para bater com o tipo Block
  static isBlock(element: Node | HTMLElement | null): element is Block {
    if (!(element instanceof HTMLElement)) return false
    if (!(element.parentElement?.contentEditable == 'true')) return false
    return true
  }

  // TODO: Esse metodo está sendo usado?
  static isEmpty(block: Block) {
    return block.innerHTML == '<br>'
  }

  static create(textContent?: string) { // logica principal para criar blocos de texto, cuidando de caracteres especificos como '' e ' '
    const block = document.createElement('div')
    block.innerHTML = '<br>'

    if (textContent) {
      block.textContent = textContent
    } else if (textContent == ' ') {
      block.textContent = nbsp
    } else if (textContent?.[textContent.length - 1] == ' ') {
      block.textContent = textContent.substring(0, textContent.length - 1) + nbsp
    } else if (textContent?.[0] == ' ') {
      block.textContent = nbsp + textContent.substring(1, textContent.length)
    }
    return block as Block
  }

  static createMany(text: string) {
    return text.split('\n').map(line => TextBlock.create(line))
  }

  static merge([firstLine, secondLine]: Block[]) {
    return TextBlock.create(firstLine.textContent + secondLine.textContent)
  }

  static split(block: HTMLElement, offset: number) {
    const before = block.cloneNode() as HTMLElement
    const after = block.cloneNode() as HTMLElement

    before.innerHTML = '<br>'
    after.innerHTML = '<br>'

    const beforeText = block.textContent.substring(0, offset)
    if (beforeText) before.textContent = beforeText

    const afterText = block.textContent.substring(offset)
    if (afterText) after.textContent = afterText

    return [before, after]
  }

  //static mergeBackward({ node }: ICaretPosition) {
  static mergeBackward(cursor: ICursorState) {
    const { node } = cursor.from

    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock) as Block
    if (!line) return

    const prevLine = line.previousElementSibling
    if (!TextBlock.isBlock(prevLine)) return

    const merged = TextBlock.merge([prevLine, line])
    const offset = prevLine.textContent.length

    prevLine.replaceWith(merged)
    line.remove()

    cursor.set({ node: merged.firstChild, offset })
  }

  //static mergeForward({ node, offset }: ICaretPosition) {
  static mergeForward(cursor: ICursorState) {
    const { node, offset } = cursor.from
    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock) as Block
    if (!line) return

    const nextLine = line.nextElementSibling
    if (!TextBlock.isBlock(nextLine)) return

    const merged = TextBlock.merge([line, nextLine])

    line.replaceWith(merged)
    nextLine.remove()

    cursor.set({ node: merged.firstChild, offset })
  }

  // TODO: splitLineOnCaret pode ser removida posteriormente, pois
  // splitLineOnRange já cobre seleções colapsadas também
  // falta testar o caso dele não encontrar a linha
  static splitLineOnCaret(cursor: ICursorState) {
    const { node, offset } = cursor.from
    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock)
    if (!line) return

    const [before, after] = TextBlock.split(line, offset)
    line.replaceWith(before, after)

    cursor.set({ node: after, offset: 0 })
  }

  // TODO:
  // falta testar o da seleção feita da direção inversa
  // falta os casos em que ele não encontra as linhas
  static splitLineOnRange(cursor: ICursorState) {
    const { from: start, to: end } = cursor
    if (start.node == end.node) {
      const node = start.node
      let startPos = start.offset
      let endPos = end.offset

      if (startPos > endPos) [startPos, endPos] = [endPos, startPos]

      const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock)
      if (!line) return

      const [before, after] = TextBlock.split(line, endPos)
      before.textContent = before.textContent.substring(0, startPos)
      line.replaceWith(before, after)

      if (startPos == 0) {
        before.innerHTML = '<br>'
      }

      if (endPos == line.textContent.length) {
        after.innerHTML = '<br>'
      }

      cursor.set({ node: after, offset: 0 })
      return
    }

    const startLine = TextBlock.isBlock(start.node) ? start.node : closest(start.node, TextBlock.isBlock) as HTMLDivElement
    if (!startLine) return

    const endLine = TextBlock.isBlock(end.node) ? end.node : closest(end.node, TextBlock.isBlock) as HTMLDivElement
    if (!endLine) return

    const maxOffset = endLine.textContent.length
    cursor.deleteContents()

    if (start.offset == 0) {
      startLine.innerHTML = '<br>'
    }

    if (end.offset == maxOffset) {
      endLine.innerHTML = '<br>'
    }

    cursor.set({ node: endLine, offset: 0 })
  }

}


export class Line {
  static isLine(element: Node | HTMLDivElement | null): element is HTMLDivElement {
    if (!(element instanceof HTMLDivElement)) return false
    //if (!element.hasAttribute('line')) return false
    return true
  }

  static isEmpty(line: HTMLDivElement) {
    return line.innerHTML == '<br>'
  }

  static create(textContent?: string) {
    const line = document.createElement('div')
    line.innerHTML = '<br>'

    if (textContent) line.textContent = textContent

    return line
  }

  static createMany(text: string) {
    return text.split('\n').map(line => Line.create(line))
  }

  static split(line: HTMLDivElement, offset: number) {
    const text = line.textContent
    const before = Line.create((text ?? '').substring(0, offset))
    const after = Line.create((text ?? '').substring(offset))

    return [before, after]
  }

  static merge([firstLine, secondLine]: HTMLDivElement[]) {
    return Line.create(firstLine.textContent + secondLine.textContent)
  }
}
