export type Block = HTMLElement & {
  textContent: string,
  firstChild: ChildNode | HTMLBRElement
  parentElement: HTMLElement
}

export class TextBlock {
  static isBlock(element: Node | HTMLElement | null): element is Block {
    if (!(element instanceof HTMLElement)) return false
    if (!(element.parentElement?.hasAttribute('contenteditable'))) return false
    return true
  }

  static isEmpty(block: Block) {
    return block.innerHTML == '<br>'
  }

  static create(textContent?: string) {
    const block = document.createElement('div')
    block.innerHTML = '<br>'

    if (textContent) block.textContent = textContent
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
}


export class Line {
  static isLine(element: Node | HTMLDivElement | null): element is HTMLDivElement {
    if (!(element instanceof HTMLDivElement)) return false
    if (!element.hasAttribute('line')) return false
    return true
  }

  static isEmpty(line: HTMLDivElement) {
    return line.innerHTML == '<br>'
  }

  static create(textContent?: string) {
    const line = document.createElement('div')
    line.setAttribute('line', '')
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
