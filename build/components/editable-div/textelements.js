import { el } from '../../utils/';
const LINE_TAG = 'div';
const LINE_ATTR = 'line';
const LINE_STYLE = {};
const DEFAULT_TAG = 'div';
const ElementTypeProto = HTMLDivElement;
export class TextElement {
    static isTextElement(element) {
        if (!(element instanceof ElementTypeProto))
            return false;
        if (!element.firstChild)
            return false;
        return true;
    }
    static isEmpty(element) {
        return element.innerHTML == '<br>';
    }
    static create(text, tag) {
        const element = document.createElement(tag !== null && tag !== void 0 ? tag : DEFAULT_TAG);
        element.innerHTML = '<br>';
        if (text)
            element.textContent = text;
        return element;
    }
    static createMany(text) {
        return text ? text.split('\n').map(line => TextElement.create(line)) : [];
    }
    static split(line, offset) {
        const text = line.textContent;
        const before = TextElement.create(text.substring(0, offset));
        const after = TextElement.create(text.substring(offset));
        return [before, after];
    }
    static merge([firstLine, secondLine]) {
        return TextElement.create(firstLine.textContent + secondLine.textContent);
    }
}
// how to register a new text element?
// textbox
//
// TextboxKeydownStrategy.add()
//
/*
 * keydown events call ElementStrategy -> KeydownStrategy
   RegisteredElements = {
    'div-line': {}
    'default': {}
    'block': {}
   }
 * ElementStrategy = {
     'Enter': () => {},
     'Backspace': () => {},
     'Delete': () => {}
   }
 */
// Uma linha(div line) pode conter elementos span word(palavra)
// l.getAttributeNames()[0]
// l.tagName
// clone block type :
const clone = (element) => {
    const tag = element.tagName.toLowerCase();
    const type = element.getAttributeNames()[0];
    const clone = el(tag, {
        attributes: [{ name: type, value: '' }]
    });
    return clone;
};
const line = {
    'paste': () => { },
    'keydown': {
        'Enter': () => { }
    }
};
const TextElementStrategyMap = new Map();
TextElementStrategyMap.set('default', {});
export class Line {
    static isLine(element) {
        if (!(element instanceof HTMLDivElement))
            return false;
        if (!element.hasAttribute(LINE_ATTR))
            return false;
        return true;
    }
    static isEmpty(line) {
        return line.innerHTML == '<br>';
    }
    static create(textContent) {
        const line = el(LINE_TAG, {
            innerHTML: '<br>',
            attributes: [{ name: LINE_ATTR, value: '' }],
            style: LINE_STYLE
        });
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
