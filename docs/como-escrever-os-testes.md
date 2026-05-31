# Como escrever os testes

Para a escrita dos testes, deve-se usar como base o padrão descrito a seguir:

## Casos gerais:

Podemos generalizar os casos de inserção de texto em elementos editáveis em:

Target: Node HTML que receberá a inserção do texto
Value: valor que será inserido no target

Target (Node | HTMLElement):
1. com texto: (#text)
    Value (string):
    1.1. uma linha: 'linha'
        Selection:
        1.1.1. Colapsado:
                1.1.1.1 Cursor no inicio    ->  '|texto' -> 'linha|texto'
                1.1.1.2 Cursor no meio      ->  'tex|to' -> 'texlinha|to'
                1.1.1.3 Cursor no fim       ->  'texto|' -> 'textolinha|'
        1.1.2. Não Colapsado:
            1.1.2.1 Node unico (from.node == to.node):
                1.1.2.1.1 Cursor do inicio para o meio  ->  '|tex|to' -> 'linha|to'
                1.1.2.1.2 Cursor do meio para o meio    ->  't|ext|o' -> 'tlinha|o'
                1.1.2.1.3 Cursor do meio para o fim     ->  'tex|to|' -> 'texlinha|'
                1.1.2.1.4 Cursor do inicio para o fim   ->  '|texto|' -> 'linha|'
            1.1.2.2 Multi Node (from.node != to.node):
                1.1.2.2.1 Cursor do inicio do from.node até o inicio do to.node ->  '|texto1\n|texto2' -> 'linha|texto2'
                1.1.2.2.2 Cursor do inicio do from.node até o meio do to.node   ->  '|texto1\ntex|to2' -> 'linha|to2'
                1.1.2.2.3 Cursor do inicio do from.node até o fim do to.node    ->  '|texto1\ntexto2|' -> 'linha|'
                1.1.2.2.4 Cursor do meio do from.node até o inicio do to.node   ->  'tex|to1\n|texto2' -> 'texlinha|texto2'
                1.1.2.2.5 Cursor do meio do from.node até o meio do to.node     ->  'tex|to1\ntex|to2' -> 'texlinha|to2'
                1.1.2.2.6 Cursor do meio do from.node até o fim do to.node      ->  'tex|to1\ntexto2|' -> 'texlinha|'
                1.1.2.2.7 Cursor do fim do from.node até o inicio do to.node    ->  'texto1|\n|texto2' -> 'texto1linha|texto2'
                1.1.2.2.8 Cursor do fim do from.node até o meio do to.node      ->  'texto1|\ntex|to2' -> 'texto1linha|to2'
                1.1.2.2.9 Cursor do fim do from.node até o fim do to.node       ->  'texto1|\ntexto2|' -> 'texto1linha|'
    1.2. mais de uma linha: 'linha1\nlinha2'
        Selection:
        1.2.1. Colapsado:
                1.1.1.1 Cursor no inicio    ->  '|texto' -> 'linha1\nlinha2|texto'
                1.1.1.2 Cursor no meio      ->  'tex|to' -> 'texlinha1\nlinha2|to'
                1.1.1.3 Cursor no fim       ->  'texto|' -> 'textolinha1\nlinha2|'
        1.2.2. Não Colapsado:
            1.2.2.1 Node unico (from.node == to.node):
                1.2.2.1.1 Cursor do inicio para o meio  ->  '|tex|to' -> 'linha1\nlinha2|to'
                1.2.2.1.2 Cursor do meio para o meio    ->  't|ext|o' -> 'tlinha1\nlinha2|o'
                1.2.2.1.3 Cursor do meio para o fim     ->  'tex|to|' -> 'texlinha1\nlinha2|'
                1.2.2.1.4 Cursor do inicio para o fim   ->  '|texto|' -> 'linha1\nlinha2|'
            1.2.2.2 Multi Node (from.node != to.node):
                1.2.2.2.1 Cursor do inicio do from.node até o inicio do to.node ->  '|texto1\n|texto2' -> 'linha1\nlinha2|texto2'
                1.2.2.2.2 Cursor do inicio do from.node até o meio do to.node   ->  '|texto1\ntex|to2' -> 'linha1\nlinha2|to2'
                1.2.2.2.3 Cursor do inicio do from.node até o fim do to.node    ->  '|texto1\ntexto2|' -> 'linha1\nlinha2|'
                1.2.2.2.4 Cursor do meio do from.node até o inicio do to.node   ->  'tex|to1\n|texto2' -> 'texlinha1\nlinha2|texto2'
                1.2.2.2.5 Cursor do meio do from.node até o meio do to.node     ->  'tex|to1\ntex|to2' -> 'texlinha1\nlinha2|to2'
                1.2.2.2.6 Cursor do meio do from.node até o fim do to.node      ->  'tex|to1\ntexto2|' -> 'texlinha1\nlinha2|'
                1.2.2.2.7 Cursor do fim do from.node até o inicio do to.node    ->  'texto1|\n|texto2' -> 'texto1linha1\nlinha2|texto2'
                1.2.2.2.8 Cursor do fim do from.node até o meio do to.node      ->  'texto1|\ntex|to2' -> 'texto1linha1\nlinha2|to2'
                1.2.2.2.9 Cursor do fim do from.node até o fim do to.node       ->  'texto1|\ntexto2|' -> 'texto1linha1\nlinha2|'

2. vazio: (<div><br></div>) node = div, offset = 0
    Value (string):
    2.1. uma linha: 'linha'
        Selection:
        2.1.1. Colapsado:
                2.1.1.1 Cursor no inicio/meio/fim   ->  '|' -> 'linha|'
    2.2. mais de uma linha: 'linha1\nlinha2'
        Selection:
        2.2.1. Colapsado:
                2.2.1.1 Cursor no inicio/meio/fim   ->  '|' -> 'linha1\nlinha2|'

Após cada tipo de inserção de texto o cursor sempre deve terminar na posição logo após o texto
inserido. Se ao invés de inserido, o texto foi removido, então o cursor deve terminar na posição
final da direção de remoção, ou seja, se removeu para frente, a posição inicial se mantem, se removeu para trás a posição anda para trás.

## Estado do cursor:

O cursor pode estar colapsado ou não no momento da ação do usuário, e isso é representado pelo campo: type no objeto do tipo ICursorState. O cursor
colapsado indica que a posição de início é igual a posição final, tanto o node quando o offset. O cursor não colapsado indica que há uma seleção, ou 
seja, começa em um ponto do texto e termina em outro, podendo estar contida no mesmo node e com offsets diferentes, ou começando em um node e terminando
em outro.

As posições de cursor mais relevantes para escrever testes são as seguintes:

- cursor colapsado no inicio da palavra: "|palavra"
- cursor colapsado no meio da palavra: "pala|vra"
- cursor colapsado no fim da palavra: "palavra|"
- cursor colapsado em linha em branco: "|<br>"
- cursor colapsado em antes de espaço em branco nbsp: "|\u00a0"
- cursor colapsado em depois de espaço em branco nbsp: "\u00a0|"

Na especificação do caso de teste deve-se representar o estado de innerHTML do editableDiv, antes e depois de executar a ação sob teste, indicando também
a posição do cursor:

antes: <div>|<br></div>
depois: <div><br></div><div>|<br></div>

## Como gerar esse texto:

será passado o seguinte:
tipo do bloco, tag e texto, com a posição do cursor embutida no texto:

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

obter os casos descritos e gerar os htmls de antes e depois a partir do texto.
