//import { Line } from './text-elements'
import { TextBlock as Line } from './text-elements'
import { Handlers } from './events/events'

export class EditableDiv {
  static create() {
    const element = document.createElement('div')

    element.setAttribute('contenteditable', '')
    element.innerHTML = Line.create().outerHTML

    Handlers.forEach(({ type, callback, options }) => element.addEventListener(type, callback, options))

    return element
  }

  /*
  static isEditableDiv(element: Node | typeof TEXT_BOX_TYPE | null): element is HTMLDivElement {
    if (!(element instanceof TEXT_BOX_TYPE)) return false
    if (!element.hasAttribute('contenteditable')) return false
    if (!element.hasAttribute(TEXT_BOX_ATTR)) return false
    if (element.tagName.toLowerCase() != TEXT_BOX_TAG) return false
    return true
  }
  */
}
