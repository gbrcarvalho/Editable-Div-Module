export class TextBlock {
    static isBlock(element) {
        var _a;
        if (!(element instanceof HTMLElement))
            return false;
        if (!((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.hasAttribute('contenteditable')))
            return false;
        return true;
    }
    static isEmpty(block) {
        return block.innerHTML == '<br>';
    }
    static create(textContent) {
        const block = document.createElement('div');
        block.innerHTML = '<br>';
        if (textContent)
            block.textContent = textContent;
        return block;
    }
    static createMany(text) {
        return text.split('\n').map(line => TextBlock.create(line));
    }
    static merge([firstLine, secondLine]) {
        return TextBlock.create(firstLine.textContent + secondLine.textContent);
    }
    static split(block, offset) {
        const before = block.cloneNode();
        const after = block.cloneNode();
        before.innerHTML = '<br>';
        after.innerHTML = '<br>';
        const beforeText = block.textContent.substring(0, offset);
        if (beforeText)
            before.textContent = beforeText;
        const afterText = block.textContent.substring(offset);
        if (afterText)
            after.textContent = afterText;
        return [before, after];
    }
}
export class Line {
    static isLine(element) {
        if (!(element instanceof HTMLDivElement))
            return false;
        if (!element.hasAttribute('line'))
            return false;
        return true;
    }
    static isEmpty(line) {
        return line.innerHTML == '<br>';
    }
    static create(textContent) {
        const line = document.createElement('div');
        line.setAttribute('line', '');
        line.innerHTML = '<br>';
        if (textContent)
            line.textContent = textContent;
        return line;
    }
    static createMany(text) {
        return text.split('\n').map(line => Line.create(line));
    }
    static split(line, offset) {
        const text = line.textContent;
        const before = Line.create((text !== null && text !== void 0 ? text : '').substring(0, offset));
        const after = Line.create((text !== null && text !== void 0 ? text : '').substring(offset));
        return [before, after];
    }
    static merge([firstLine, secondLine]) {
        return Line.create(firstLine.textContent + secondLine.textContent);
    }
}
