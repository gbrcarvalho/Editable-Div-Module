import { TextBlock } from '../../text-elements';
import { Caret } from '../../../../utils/selection';
import { closest } from '../../../../utils/helpers';
export function mergeForward({ node, offset }) {
    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
    if (!line)
        return;
    const nextLine = line.nextElementSibling;
    if (!TextBlock.isBlock(nextLine))
        return;
    const merged = TextBlock.merge([line, nextLine]);
    line.replaceWith(merged);
    nextLine.remove();
    Caret.set({ node: merged.firstChild, offset });
}
