import { IBlockType, TextBlock, type InputType } from './text-elements'

export type EditableDivElement = HTMLDivElement & {
  firstChild: ChildNode
  firstElementChild: HTMLElement
  contentEditable: 'true'
  setup: (this: EditableDivElement) => void
  registerBlockType: (blockType: IBlockType) => void
  select: (this: EditableDivElement, from?: ICaretPosition, to?: ICaretPosition) => ICursorState | void
}

const registry: Record<string, IBlockType> = {
  'default': TextBlock
}

export class EditableDiv {
  static create(baseBlock?: IBlockType) {
    const element = document.createElement('div') as EditableDivElement

    element.contentEditable = 'true'
    element.innerHTML = baseBlock?.create().outerHTML ?? '<div><br></div>'
    element.setup = setupEditableDiv
    element.registerBlockType = registerBlockType

    element.select = select

    return element
  }
}

function getClosestBlock(node: Node | HTMLElement | null) {
  return (node?.parentElement?.closest('[data-type]') as HTMLElement)?.dataset?.type ?? null
}

export type CaretType = 'Caret' | 'Range'
export interface ICaretPosition {
  node: Node,
  offset: number,
}
export interface ICursorState {
  type: CaretType
  from: ICaretPosition
  to: ICaretPosition
  set: (from: ICaretPosition, to?: ICaretPosition) => void
  deleteContents: () => void
  cloneContents: () => DocumentFragment
}

function select(this: HTMLElement, from?: ICaretPosition, to?: ICaretPosition): ICursorState | void {
  if (!from) return getCursorState(this) as ICursorState
  setCursorState(from, to)
}

function getCursorState(element: HTMLElement): ICursorState {
  const s = window.getSelection()
  if (!s) throw new Error('Couldnt get the Selection object!')

  const { type: caretType } = s
  if (caretType == 'None') throw new Error('No selection')

  const range = s.getRangeAt(0)
  const { startContainer, startOffset, endContainer, endOffset } = range

  if (!(element.contains(startContainer)) || !(element.contains(startContainer))) throw new Error('Cursor is outside the given scope')

  return {
    type: caretType as CaretType,
    from: { node: startContainer, offset: startOffset },
    to: { node: endContainer, offset: endOffset },
    set: function(from, to?) {
      setCursorState(from, to)
    },
    deleteContents: function() {
      range.deleteContents()
    },
    cloneContents: function() {
      return range.cloneContents()
    }
  }
}

function setCursorState(from: ICaretPosition, to?: ICaretPosition): void {
  const s = window.getSelection()
  if (!s) throw new Error('Couldnt get the Selection object!')

  const range = s.getRangeAt(0)

  range.setStart(from.node, from.offset)

  if (to) {
    range.setEnd(to.node, to.offset)
  } else {
    range.setEnd(from.node, from.offset)
  }
}

function setupEditableDiv(this: EditableDivElement) {
  this.addEventListener('beforeinput', (ev: InputEvent) => {
    const cursor = this.select() as ICursorState
    const { from, to } = cursor
    const startBlock = getClosestBlock(from.node) ?? 'default'
    const endBlock = getClosestBlock(to.node) ?? 'default'

    if (startBlock != endBlock) return

    const handler = registry[startBlock].handlers[ev.inputType as InputType]
    if (handler) {
      handler(ev, cursor)
      return
    }
  })
}

function registerBlockType(blockType: IBlockType) {
  const { name } = blockType
  if (name == 'default') return

  registry[name] = blockType
}
