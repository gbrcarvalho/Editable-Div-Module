# Elementos de Texto Default

Inicialmente será implementado somente <div> como elementos de texto default, representando uma linha
do texto do editor. Não haverão elementos aninhados, essas <div> irão conter somente texto, sendo o
único caso divergente, este a seguir: <div><br></div>, que representa uma linha completamente vazia.

Não haverão listas, ou tabelas, o <h1> .. <h6>, ou qualquer outro elemento, inicialmente.

Um bloco deve ser modelado em uma classe que vai ter os seguintes métodos:
converter texto em bloco(HTMLElement)
converter bloco em texto
converter bloco em dados(JSON)
converter dados em bloco

* lógica de split *
* lógica de mergeForward *
* lógica de mergeBackward *

# Evento beforeinput

O fluxo escolhido até então foi o seguinte:

O callback chamado pelo evento beforeinput irá chamar o respectivo handler baseado no inputType:

primeiro passa por uma etapa de verificação para descobrir com que tipo de target node está lidando,
checa data-type, e tag nos parents, caso não encontre nenhum data-type, fica com a primeira tag encontrada.
obtem o modelo do blocktype no registry(se não houver chama o default) e:

const handlers = {
'insertParagraph': (event, cursor, blockType) => void
...
}

cada handler :

BlockType {
    create()
    createAll()
    text()
    data()
    split()
    mergeForward()
    mergeBackward()
}

o previous sibling que define o merge backward
o node target que define o merge forward

Futuramente serão implementados como default a possibilidade de aninhar elementos em um único nível,
aceitando elementos inline:

- <span></span>
- <b></b>
- <i></i>
- <strong></strong>
- <mark></mark>
- <a></a>
- <u></u>

  deleteByCut:             (e) => {}, // Ctrl + x
  deleteByDrag:            (e) => {}, // not deleting
  historyUndo:             (e) => {}, // Ctrl + z
  historyRedo:             (e) => {}, // Ctrl + y

  insertText:               (e) => {}, // a, b, c ... 
  insertParagraph:          (e) => {}, // Enter                     implementado
  insertLineBreak:          (e) => {}, // Shift + Enter             bloqueado
  insertFromPaste:          (e) => {}, // Ctrl + v                  implementado
  insertFromDrop:           (e) => {}, // Drop                      falta implementar
  deleteContentBackward:    (e) => {}, // Backspace                 implementado
  deleteContentForward:     (e) => {}, // Delete                    implementado
  deleteWordBackward:       (e) => {}, // Ctrl + Backspace          falta implementar
  deleteWordForward:        (e) => {}, // Ctrl + Delete             falta implementar
  deleteSoftLineBackward:   (e) => {}, // Ctrl + Shift + Backspace  falta implementar
  deleteByCut:              (e) => {}, // Ctrl + x                  falta implementar
  deleteByDrag:             (e) => {}, // not deleting              não implementado
  historyUndo:              (e) => {}, // Ctrl + z                  falta implementar
  historyRedo:              (e) => {}, // Ctrl + y                  falta implementar

/*
  insertFromYank:          (e) => {}, // Não dispara em browsers modernos
  insertTranspose:         (e) => {}, // MacOs
  insertCompositionText:   (e) => {}, // ----

  deleteSoftLineForward:   (e) => {}, // ----

  deleteHardLineBackward:  (e) => {}, // Não dispara em browsers modernos
  deleteHardLineForward:   (e) => {}, // Não dispara em browsers modernos

  deleteEntireSoftLine:    (e) => {}, // Não existe implementação

  formatBold:              (e) => {}, // ----
  formatItalic:            (e) => {}, // ----
  formatUnderline:         (e) => {}, // ----
  formatStrikeThrough:     (e) => {}, // ----
*/
