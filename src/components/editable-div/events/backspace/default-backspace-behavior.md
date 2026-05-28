# Ao pressionar 'Backspace' em um elemento editavel deve acontecer:

# * o caracter '|' representa a posição cursor, não aparece no texto final,
# * cada teste indica como fica o innerHTML do elemento editavel antes e depois de apertar 'Backspace'
# * obviamente sem o cursor no texto.

# TODO -> REESCREVER TESTES, COPIADO DO ENTER

# tem que verificar se o caret está colapsado ou não, só executa a função se estiver colapsado

# uma unica linha:

1. backspace com a linha vazia:

element.innerHTML:
antes:  <div line="">|<br></div>
depois: <div line="">|<br></div>

2. backspace com texto na linha cursor no inicio:

textbox.innerHTML:
antes:  <div line="">|texto</div>
depois: <div line="">|texto</div>

# duas linhas:

## duas linhas vazias:

1. backspace na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line=""><br></div>
depois:  <div line="">|<br></div><div line=""><br></div>

2. backspace na segunda linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|<br></div>
depois:  <div line="">|<br></div>

## primeira linha com texto e segunda linha vazia:

1. backspace na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto</div><div line=""><br></div>
depois:  <div line="">|texto</div><div line=""><br></div>

2. backspace na segunda linha:

textbox.innerHTML:
antes:   <div line="">texto</div><div line="">|<br></div>
depois:  <div line="">texto|</div>

## primeira linha vazia e segunda linha com texto:

1. backspace na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line="">texto</div>
depois:  <div line="">|<br></div><div line="">texto</div>

2. backspace na segunda linha cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|texto</div>
depois:  <div line="">|texto</div>

## duas linhas com texto:

1. backspace na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div>
depois:  <div line="">|texto1</div><div line="">texto2</div>

4. backspace na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div>
depois:  <div line="">texto1|texto2</div>

# três linhas:

## três linhas vazias:

1. backspace na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line=""><br></div><div line=""><br></div>
depois:  <div line="">|<br></div><div line=""><br></div><div line=""><br></div>

2. backspace na segunda linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|<br></div><div line=""><br></div>
depois:  <div line="">|<br></div><div line=""><br></div>

3. backspace na terceira linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line=""><br></div><div line="">|<br></div>
depois:  <div line=""><br></div><div line="">|<br></div>

## primeira linha com texto, segunda e terceira vazias:

1. backspace na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto</div><div line=""><br></div><div line=""><br></div>
depois:  <div line="">|texto</div><div line=""><br></div><div line=""><br></div>

2. backspace na segunda linha:

textbox.innerHTML:
antes:   <div line="">texto</div><div line="">|<br></div><div line=""><br></div>
depois:  <div line="">texto|</div><div line=""><br></div>

3. backspace na terceira linha:

textbox.innerHTML:
antes:   <div line="">texto</div><div line=""><br></div><div line="">|<br></div>
depois:  <div line="">texto</div><div line="">|<br></div>

## primeira linha vazia, segunda linha com texto, terceira linha vazia:

1. backspace na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line="">texto</div><div line=""><br></div>
depois:  <div line="">|<br></div><div line="">texto</div><div line=""><br></div>

2. backspace na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|texto</div><div line=""><br></div>
depois:  <div line="">|texto</div><div line=""><br></div>

3. backspace na terceira linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto</div><div line="">|<br></div>
depois:  <div line=""><br></div><div line="">texto|</div>

## primeira e segunda linhas vazias, terceira linha com texto:

1. backspace na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line=""><br></div><div line="">texto</div>
depois:  <div line="">|<br></div><div line=""><br></div><div line="">texto</div>

2. backspace na segunda linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|<br></div><div line="">texto</div>
depois:  <div line="">|<br></div><div line="">texto</div>

3. backspace na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line=""><br></div><div line="">|texto</div>
depois:  <div line=""><br></div><div line="">|texto</div>

## três linhas com texto:

1. backspace na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div><div line="">texto3</div>
depois:  <div line="">|texto1</div><div line="">texto2</div><div line="">texto3</div>

2. backspace na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div><div line="">texto3</div>
depois:  <div line="">texto1|texto2</div><div line="">texto3</div>

3. backspace na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2</div><div line="">|texto3</div>
depois:  <div line="">texto1</div><div line="">texto2|texto3</div>

## primeira linha com texto, segunda linha vazia, terceira linha com texto:

1. backspace na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line=""><br></div><div line="">texto2</div>
depois:  <div line="">|texto1</div><div line=""><br></div><div line="">texto2</div>

2. backspace na segunda linha:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|<br></div><div line="">texto2</div>
depois:  <div line="">texto1|</div><div line="">texto2</div>

3. backspace na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line=""><br></div><div line="">|texto2</div>
depois:  <div line="">texto1</div><div line="">|texto2</div>

## primeira linha vazia, segunda e terceira linhas com texto:

1. backspace na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line="">texto1</div><div line="">texto2</div>
depois:  <div line="">|<br></div><div line="">texto1</div><div line="">texto2</div>

2. backspace na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|texto1</div><div line="">texto2</div>
depois:  <div line="">|texto1</div><div line="">texto2</div>

3. backspace na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto1</div><div line="">|texto2</div>
depois:  <div line=""><br></div><div line="">texto1|texto2</div>

## primeira e segunda linhas com texto, terceira linha vazia:

1. backspace na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div><div line=""><br></div>
depois:  <div line="">|texto1</div><div line="">texto2</div><div line=""><br></div>

2. backspace na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div><div line=""><br></div>
depois:  <div line="">texto1|texto2</div><div line=""><br></div>

3. backspace na terceira linha:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2</div><div line="">|<br></div>
depois:  <div line="">texto1</div><div line="">texto2|</div>
