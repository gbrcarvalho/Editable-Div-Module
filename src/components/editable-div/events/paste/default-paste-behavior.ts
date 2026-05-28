import { Line } from '../../text-elements'
import { Caret } from '../../../../utils/selection'
import { closest } from '../../../../utils/helpers'

export const pasteHandler = (ev: Event) => {
  if (!(ev instanceof ClipboardEvent)) return
  ev.preventDefault()

  const text = ev.clipboardData?.getData('text/plain')
  console.log('text: ', text)
  if (!text) return

  // busca o textbox pai
  //const textBoxElement = closest(ev.target as HTMLElement, TextBox.isTextBox)
  //if (!TextBox.isTextBox(textBoxElement)) throw new Error(`should be textbox: ${ev.target}`)

  // transforma o texto em <linhas>
  const lines = Line.createMany(text)
  if (lines.length == 0) return

  // busca a linha onde o caret está
  const { node: initialNode, offset: initialOffset } = Caret.get(/*textBoxElement*/)
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
    Caret.set({ node: merged.firstChild!, offset })
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
    Caret.set({ node: lastMerge.firstChild!, offset })
  }

  return
}
