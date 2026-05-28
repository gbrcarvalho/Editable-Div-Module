import { Cursor, ICaretPosition } from '../../../utils/selection'

import { splitLineOnCaret, splitLineOnRange } from './enter/default-enter-behavior'
import { mergeForward } from './delete/default-delete-behavior'
import { mergeBackward } from './backspace/default-backspace-behavior'
import { pasteHandler } from './paste/default-paste-behavior'

type KeydownStrategyFunction = (ev: KeyboardEvent) => void
type KeyHandler = (ev: KeyboardEvent) => void
type OnCaretKeyHandler = (ev: KeyboardEvent, caret: ICaretPosition) => void
type OnRangeKeyHandler = (ev: KeyboardEvent, caret: [ICaretPosition, ICaretPosition]) => void
type KeyHandlerStrategy = {
  Caret?: OnCaretKeyHandler
  Range?: OnRangeKeyHandler
} | KeyHandler

export const KeydownStrategy: Record<string, KeyHandlerStrategy> = {
  'Backspace': {
    'Caret': (ev: KeyboardEvent, caret: ICaretPosition) => {
      const { node, offset } = caret
      if (offset == 0) {
        ev.preventDefault()
        mergeBackward({ node, offset })
      }
    },
    'Range': (ev: KeyboardEvent, caret: [ICaretPosition, ICaretPosition]) => {
      const { node, offset } = caret[0]
      if (offset == 0) {
        ev.preventDefault()
        mergeBackward({ node, offset })
      }
    },
  },
  'Delete': {
    'Caret': (ev: KeyboardEvent, caret: ICaretPosition) => {
      const { node, offset } = caret
      if (offset == (node.textContent ?? '').length) { // ao apertar delete no final da linha
        ev.preventDefault()
        mergeForward({ node, offset })
      }
    },
    'Range': (ev: KeyboardEvent, caret: [ICaretPosition, ICaretPosition]) => {
      const { node, offset } = caret[0]
      if (offset == (node.textContent ?? '').length) { // ao apertar delete no final da linha
        ev.preventDefault()
        mergeForward({ node, offset })
      }
    },
  },
  'Enter': {
    'Caret': (ev: KeyboardEvent, caret: ICaretPosition) => {
      ev.preventDefault()
      if (ev.shiftKey) return
      splitLineOnCaret(caret)
    },
    'Range': (ev: KeyboardEvent, range: [ICaretPosition, ICaretPosition]) => {
      ev.preventDefault()
      if (ev.shiftKey) return
      splitLineOnRange(range)
    },
  },
  'z': (ev: KeyboardEvent) => {
    const isUndo = (ev.ctrlKey) && (ev.key == 'z')
    const isRedo = (ev.ctrlKey) && (ev.key == 'z' && ev.shiftKey)
    if (isUndo || isRedo) ev.preventDefault()
  },
  'y': (ev: KeyboardEvent) => {
    const isRedo = (ev.ctrlKey) && (ev.key === 'y')
    if (isRedo) ev.preventDefault()
  },
}

type KeydownStrategy = typeof KeydownStrategy
type InputHandler = (ev: Event) => void
type PasteHandler = (ev: ClipboardEvent) => void
type DropHandler = (ev: DragEvent) => void
type DragOverHandler = (ev: DragEvent) => void

interface IEditableDivEventHandler {
  keydown: KeydownStrategy
  input: InputHandler
  paste: PasteHandler
  drop: DropHandler
  dragOver: DragOverHandler
}

const TextElements: Record<string, Partial<IEditableDivEventHandler>> = {
  'default': {}
}

export const keydownHandler = (ev: Event) => {
  if (!(ev instanceof KeyboardEvent)) return
  const key = ev.key as keyof typeof KeydownStrategy

  const cursor = Cursor.get()
  const type = cursor.type
  const [start, end] = cursor.range

  const handler = KeydownStrategy[key]
  if (!handler) return
  if (typeof handler == 'function') {
    handler(ev)
    return
  }

  if (type == 'Range') {
    handler['Range']?.(ev, [start, end])
    return
  }
  handler['Caret']?.(ev, start)
}

const dragOverHandler = (ev: Event) => {
  if (!(ev instanceof DragEvent)) return
  ev.preventDefault()
  if (ev.dataTransfer) {
    ev.dataTransfer.dropEffect = 'none'
  }
}

const dropHandler = (ev: Event) => {
  ev.preventDefault()
}

type EventHandler = {
  type: keyof DocumentEventMap,
  callback: (ev: Event) => void,
  options?: boolean | AddEventListenerOptions
}

export const Handlers: EventHandler[] = [
  { type: 'keydown', callback: keydownHandler },
  { type: 'paste', callback: pasteHandler },
  { type: 'dragover', callback: dragOverHandler },
  { type: 'drop', callback: dropHandler },
]
