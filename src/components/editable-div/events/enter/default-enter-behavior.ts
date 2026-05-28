//import { Line } from '../../text-elements'
import { TextBlock } from '../../text-elements'
import { Caret, ICaretPosition } from '../../../../utils/selection'
import { closest } from '../../../../utils/helpers'

// TODO: splitLineOnCaret pode ser removida posteriormente, pois
// splitLineOnRange já cobre seleções colapsadas também
// falta testar o caso dele não encontrar a linha
export function splitLineOnCaret({ node, offset }: ICaretPosition) {
  const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock)
  if (!line) return

  const [before, after] = TextBlock.split(line, offset)
  line.replaceWith(before, after)

  Caret.set({ node: after, offset: 0 })
}

// TODO::
// falta testar o da seleção feita da direção inversa
// falta os casos em que ele não encontra as linhas
export function splitLineOnRange([start, end]: [ICaretPosition, ICaretPosition]) {
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

    Caret.set({ node: after, offset: 0 })
    return
  }

  const startLine = TextBlock.isBlock(start.node) ? start.node : closest(start.node, TextBlock.isBlock) as HTMLDivElement
  if (!startLine) return

  const endLine = TextBlock.isBlock(end.node) ? end.node : closest(end.node, TextBlock.isBlock) as HTMLDivElement
  if (!endLine) return

  const sel = window.getSelection()
  if (!sel) return

  const maxOffset = endLine.textContent.length
  const range = sel.getRangeAt(0)
  range.deleteContents()

  if (start.offset == 0) {
    startLine.innerHTML = '<br>'
  }

  if (end.offset == maxOffset) {
    endLine.innerHTML = '<br>'
  }

  Caret.set({ node: endLine, offset: 0 })
}
