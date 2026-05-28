import { TextBlock } from '../../text-elements';
import { Caret } from '../../../../utils/selection';
import { closest } from '../../../../utils/helpers';
export function mergeBackward({ node }) {
    const line = TextBlock.isBlock(node) ? node : closest(node, TextBlock.isBlock);
    if (!line)
        return;
    const prevLine = line.previousElementSibling;
    if (!TextBlock.isBlock(prevLine))
        return;
    const merged = TextBlock.merge([prevLine, line]);
    const offset = prevLine.textContent.length;
    prevLine.replaceWith(merged);
    line.remove();
    Caret.set({ node: merged.firstChild, offset });
}
