//import { Line } from './text-elements'
import { TextBlock as Line } from './text-elements';
import { Handlers } from './events/events';
export class EditableDiv {
    static create() {
        const element = document.createElement('div');
        element.setAttribute('contenteditable', '');
        element.innerHTML = Line.create().outerHTML;
        Handlers.forEach(({ type, callback, options }) => element.addEventListener(type, callback, options));
        return element;
    }
}
