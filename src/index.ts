import { EditableDiv } from './components/editable-div/editable-div'

const editableDiv = EditableDiv.create()
editableDiv.setup()

document.body.append(editableDiv)


function generate(text: string, tag: keyof HTMLElementTagNameMap, blockType: string): string {
  const nbsp = '&nbsp;'
  const createBlock = (text: string, tag: keyof HTMLElementTagNameMap, blockType: string) => {
    let resolved: string
    if (text == '') {
      resolved = '<br>'
    } else if (text == '|') {
      resolved = '|<br>'
    } else {
      resolved = text
    }
    resolved = resolved[0] == ' ' ? nbsp + resolved.substring(1) : resolved
    resolved = resolved[resolved.length - 1] == ' ' ? resolved.substring(0, resolved.length - 1) + nbsp : resolved
    return `<${tag ?? 'div'}${blockType ? ' data-type="' + blockType + '"' : ''}>${resolved}</${tag ?? 'div'}>`
  }

  return text.split('\n').map(line => createBlock(line, tag, blockType)).join('')
}
