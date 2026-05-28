# Ao disparar o evento 'paste' em um elemento editavel deve acontecer:

# * o caracter '|' representa a posição cursor, não aparece no texto final,
# * cada teste indica como fica o innerHTML do elemento editavel antes e depois do 'paste'
# * obviamente sem o cursor no texto.

// casos de paste event:
// unica linha:
// palavra1|palavra2 => palavra1pastepalavra2
// |palavra1 => pastepalavra1
// palavra1| => palavra1paste
//
// mais de uma linha:
// palavra1|palavra2 => palavra1linha1\nlinha2\npalavra2
// |palavra1 => linha1\nlinha2\npalavra1
// palavra1| => palavra1linha1\nlinha2\n

// o caret position sempre retorna ou um textNode ou um div que contem um <br>
// o texto pode ser linha_unica ou multi_linha
//
// mesclar a primeira linha na atual, e o restante appendar na frente
/*
hello
world
javascript
 */

# TODO -> REESCREVER TESTES, COPIADO DO ENTER

# uma unica linha:

1. enter com a linha vazia:

textbox.innerHTML:
antes:  <div line="">|<br></div>
depois: <div line=""><br></div><div line="">|<br></div>

2. enter com texto na linha cursor no inicio:

textbox.innerHTML:
antes:  <div line="">|texto</div>
depois: <div line=""><br></div><div line="">|texto</div>

3. enter com texto na linha cursor no meio:

textbox.innerHTML:
antes:  <div line="">tex|to</div>
depois: <div line="">tex</div><div line="">|to</div>

4. enter com texto na linha cursor no final:

textbox.innerHTML:
antes:   <div line="">texto|</div>
depois:  <div line="">texto</div><div line="">|<br></div>

# duas linhas:

## duas linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">|<br></div><div line=""><br></div>

2. enter na segunda linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|<br></div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">|<br></div>

## primeira linha com texto e segunda linha vazia:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto</div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">|texto</div><div line=""><br></div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">tex|to</div><div line=""><br></div>
depois:  <div line="">tex</div><div line="">|to</div><div line=""><br></div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto|</div><div line=""><br></div>
depois:  <div line="">texto</div><div line="">|<br></div><div line=""><br></div>

4. enter na segunda linha:

textbox.innerHTML:
antes:   <div line="">texto</div><div line="">|<br></div>
depois:  <div line="">texto</div><div line=""><br></div><div line="">|<br></div>

## primeira linha vazia e segunda linha com texto:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line="">texto</div>
depois:  <div line=""><br></div><div line="">|<br></div><div line="">texto</div>

2. enter na segunda linha cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|texto</div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">|texto</div>

3. enter na segunda linha cursor no meio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">tex|to</div>
depois:  <div line=""><br></div><div line="">tex</div><div line="">|to</div>

4. enter na segunda linha cursor no fim:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto|</div>
depois:  <div line=""><br></div><div line="">texto</div><div line="">|<br></div>

## duas linhas com texto:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div>
depois:  <div line=""><br></div><div line="">|texto1</div><div line="">texto2</div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line="">texto2</div>
depois:  <div line="">tex</div><div line="">|to1</div><div line="">texto2</div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1|</div><div line="">texto2</div>
depois:  <div line="">texto1</div><div line="">|<br></div><div line="">texto2</div>

4. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">|texto2</div>

5. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">tex|to2</div>
depois:  <div line="">texto1</div><div line="">tex</div><div line="">|to2</div>

6. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2|</div>
depois:  <div line="">texto1</div><div line="">texto2</div><div line="">|<br></div>

# três linhas:

## três linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line=""><br></div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">|<br></div><div line=""><br></div><div line=""><br></div>

2. enter na segunda linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|<br></div><div line=""><br></div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">|<br></div><div line=""><br></div>

3. enter na terceira linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line=""><br></div><div line="">|<br></div>
depois:  <div line=""><br></div><div line=""><br></div><div line=""><br></div><div line="">|<br></div>

## primeira linha com texto, segunda e terceira linhas vazias:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto</div><div line=""><br></div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">|texto</div><div line=""><br></div><div line=""><br></div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">tex|to</div><div line=""><br></div><div line=""><br></div>
depois:  <div line="">tex</div><div line="">|to</div><div line=""><br></div><div line=""><br></div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto|</div><div line=""><br></div><div line=""><br></div>
depois:  <div line="">texto</div><div line="">|<br></div><div line=""><br></div><div line=""><br></div>

4. enter na segunda linha:

textbox.innerHTML:
antes:   <div line="">texto</div><div line="">|<br></div><div line=""><br></div>
depois:  <div line="">texto</div><div line=""><br></div><div line="">|<br></div><div line=""><br></div>

5. enter na terceira linha:

textbox.innerHTML:
antes:   <div line="">texto</div><div line=""><br></div><div line="">|<br></div>
depois:  <div line="">texto</div><div line=""><br></div><div line=""><br></div><div line="">|<br></div>

## segunda linha com texto, primeira e terceira linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line="">texto</div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">|<br></div><div line="">texto</div><div line=""><br></div>

2. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|texto</div><div line=""><br></div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">|texto</div><div line=""><br></div>

3. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">tex|to</div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">tex</div><div line="">|to</div><div line=""><br></div>

4. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto|</div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">texto</div><div line="">|<br></div><div line=""><br></div>

5. enter na terceira linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto</div><div line="">|<br></div>
depois:  <div line=""><br></div><div line="">texto</div><div line=""><br></div><div line="">|<br></div>

## terceira linha com texto, primeira e segunda linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line=""><br></div><div line="">texto</div>
depois:  <div line=""><br></div><div line="">|<br></div><div line=""><br></div><div line="">texto</div>

2. enter na segunda linha:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|<br></div><div line="">texto</div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">|<br></div><div line="">texto</div>

3. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line=""><br></div><div line="">|texto</div>
depois:  <div line=""><br></div><div line=""><br></div><div line=""><br></div><div line="">|texto</div>

4. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line=""><br></div><div line="">tex|to</div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">tex</div><div line="">|to</div>

5. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line=""><br></div><div line=""><br></div><div line="">texto|</div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">texto</div><div line="">|<br></div>

## primeira e segunda linhas com texto, terceira linha vazia:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div><div line=""><br></div>
depois:  <div line=""><br></div><div line="">|texto1</div><div line="">texto2</div><div line=""><br></div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line="">texto2</div><div line=""><br></div>
depois:  <div line="">tex</div><div line="">|to1</div><div line="">texto2</div><div line=""><br></div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1|</div><div line="">texto2</div><div line=""><br></div>
depois:  <div line="">texto1</div><div line="">|<br></div><div line="">texto2</div><div line=""><br></div>

4. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div><div line=""><br></div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">|texto2</div><div line=""><br></div>

5. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">tex|to2</div><div line=""><br></div>
depois:  <div line="">texto1</div><div line="">tex</div><div line="">|to2</div><div line=""><br></div>

6. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2|</div><div line=""><br></div>
depois:  <div line="">texto1</div><div line="">texto2</div><div line="">|<br></div><div line=""><br></div>

7. enter na terceira linha:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2</div><div line="">|<br></div>
depois:  <div line="">texto1</div><div line="">texto2</div><div line=""><br></div><div line="">|<br></div>

## primeira e terceira linhas com texto, segunda linha vazia:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line=""><br></div><div line="">texto3</div>
depois:  <div line=""><br></div><div line="">|texto1</div><div line=""><br></div><div line="">texto3</div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line=""><br></div><div line="">texto3</div>
depois:  <div line="">tex</div><div line="">|to1</div><div line=""><br></div><div line="">texto3</div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1|</div><div line=""><br></div><div line="">texto3</div>
depois:  <div line="">texto1</div><div line="">|<br></div><div line=""><br></div><div line="">texto3</div>

4. enter na segunda linha:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|<br></div><div line="">texto3</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">|<br></div><div line="">texto3</div>

5. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line=""><br></div><div line="">|texto3</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line=""><br></div><div line="">|texto3</div>

6. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line=""><br></div><div line="">tex|to3</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">tex</div><div line="">|to3</div>

7. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line=""><br></div><div line="">texto3|</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">texto3</div><div line="">|<br></div>

## segunda e terceira linhas com texto, primeira linha vazia:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div line="">|<br></div><div line="">texto2</div><div line="">texto3</div>
depois:  <div line=""><br></div><div line="">|<br></div><div line="">texto2</div><div line="">texto3</div>

2. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">|texto2</div><div line="">texto3</div>
depois:  <div line=""><br></div><div line=""><br></div><div line="">|texto2</div><div line="">texto3</div>

3. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">tex|to2</div><div line="">texto3</div>
depois:  <div line=""><br></div><div line="">tex</div><div line="">|to2</div><div line="">texto3</div>

4. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto2|</div><div line="">texto3</div>
depois:  <div line=""><br></div><div line="">texto2</div><div line="">|<br></div><div line="">texto3</div>

5. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto2</div><div line="">|texto3</div>
depois:  <div line=""><br></div><div line="">texto2</div><div line=""><br></div><div line="">|texto3</div>

6. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto2</div><div line="">tex|to3</div>
depois:  <div line=""><br></div><div line="">texto2</div><div line="">tex</div><div line="">|to3</div>

7. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line=""><br></div><div line="">texto2</div><div line="">texto3|</div>
depois:  <div line=""><br></div><div line="">texto2</div><div line="">texto3</div><div line="">|<br></div>

## três linhas com texto:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div><div line="">texto3</div>
depois:  <div line=""><br></div><div line="">|texto1</div><div line="">texto2</div><div line="">texto3</div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line="">texto2</div><div line="">texto3</div>
depois:  <div line="">tex</div><div line="">|to1</div><div line="">texto2</div><div line="">texto3</div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1|</div><div line="">texto2</div><div line="">texto3</div>
depois:  <div line="">texto1</div><div line="">|<br></div><div line="">texto2</div><div line="">texto3</div>

4. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div><div line="">texto3</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">|texto2</div><div line="">texto3</div>

5. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">tex|to2</div><div line="">texto3</div>
depois:  <div line="">texto1</div><div line="">tex</div><div line="">|to2</div><div line="">texto3</div>

6. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2|</div><div line="">texto3</div>
depois:  <div line="">texto1</div><div line="">texto2</div><div line="">|<br></div><div line="">texto3</div>

7. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2</div><div line="">|texto3</div>
depois:  <div line="">texto1</div><div line="">texto2</div><div line=""><br></div><div line="">|texto3</div>

8. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2</div><div line="">tex|to3</div>
depois:  <div line="">texto1</div><div line="">texto2</div><div line="">tex</div><div line="">|to3</div>

9. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">texto2</div><div line="">texto3|</div>
depois:  <div line="">texto1</div><div line="">texto2</div><div line="">texto3</div><div line="">|<br></div>
