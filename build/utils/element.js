/*
 *d.text = function(text) {
    if (text == undefined) return this.textContent
    this.textContent = text
    return this
}
const g$ = (elementOrSelector: string | HTMLElement, scope?: Document | HTMLElement) => {
  let all: NodeListOf<Element> & {
    textContent: (element: HTMLElement, text?: string) => {
    }
  } = []
  if (typeof elementOrSelector == 'string') {
    const selector = elementOrSelector
    all = (scope || document).querySelectorAll(selector)
  } else {
  }

}

const $ = {
  new: (name: string) => {}

}
*/
export function el(tag, options) {
    const element = document.createElement(tag);
    if (!options)
        return element;
    const { id, className, innerHTML, textContent, style, attributes } = options;
    if (id)
        element.id = id;
    if (className)
        element.className = className;
    if (innerHTML)
        element.innerHTML = innerHTML;
    if (textContent)
        element.textContent = textContent;
    if (attributes) {
        for (const { name, value } of attributes) {
            element.setAttribute(name, value);
        }
    }
    if (style)
        Object.assign(element.style, style);
    return element;
}
export function closest(node, testFn) {
    const defaultTestFn = (line) => line instanceof HTMLElement;
    let parent = node.parentElement;
    while (parent && !(testFn !== null && testFn !== void 0 ? testFn : defaultTestFn)(parent)) {
        parent = parent.parentElement;
    }
    return parent;
}
