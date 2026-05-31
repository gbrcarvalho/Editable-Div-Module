import { TextBlock, Block } from '../../text-elements'
import { Caret, ICaretPosition } from '../../../../utils/selection'
import { closest } from '../../../../utils/helpers'

export function mergeForward({ node, offset }: ICaretPosition) {
  const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock) as Block
  if (!line) return

  const nextLine = line.nextElementSibling
  if (!TextBlock.isBlock(nextLine)) return

  const merged = TextBlock.merge([line, nextLine])

  line.replaceWith(merged)
  nextLine.remove()

  Caret.set({ node: merged.firstChild as ChildNode, offset })
}
