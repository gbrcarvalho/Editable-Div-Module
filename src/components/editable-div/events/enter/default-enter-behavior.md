# Ao pressionar 'Enter' em um elemento editavel deve acontecer:

# * o caracter '|' representa a posição cursor, não aparece no texto final,
# * cada teste indica como fica o innerHTML do elemento editavel antes e depois de apertar 'Enter'
# * obviamente sem o cursor no texto.

# verificar se o cursor está colapsado, caso não esteja, falta especificar o comportamento

# esses casos abaixo descrevem o comportamento do enter com o cursor colapsado, ou seja, tipo 'Caret'
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

# esses casos abaixo descrevem o comportamento do enter com o cursor não colapsado, ou seja, tipo 'Range' não
# importa a direção

# seleção contida numa única linha

textbox.innerHTML:
antes:   <div line="">t|ext|o</div>
depois:  <div line="">t</div><div line="">|o</div>

# seleção contendo uma única linha inteira

textbox.innerHTML:
antes:   <div line="">|texto|</div>
depois:  <div line=""><br></div><div line="">|<br></div>

# seleção começando em uma linha e terminando em outra

# duas linhas inteiras

textbox.innerHTML:
antes:   <div line="">|texto</div><div line="">texto|</div>
depois:  <div line=""><br></div><div line="">|<br></div>

# parcialmente a primeira linha e a segunda linha inteira

textbox.innerHTML:
antes:   <div line="">tex|to</div><div line="">texto|</div>
depois:  <div line="">tex</div><div line="">|<br></div>

# primeira linha inteira e a segunda linha parcialmente 

textbox.innerHTML:
antes:   <div line="">|texto</div><div line="">tex|to</div>
depois:  <div line=""><br></div><div line="">|to</div>

# primeira linha parcialmente e a segunda linha parcialmente 

textbox.innerHTML:
antes:   <div line="">tex|to</div><div line="">tex|to</div>
depois:  <div line="">tex</div><div line="">|to</div>

# três linhas selecionadas:

## seleção começando na primeira linha e terminando na terceira

### três linhas inteiras selecionadas

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div><div line="">texto3|</div>
depois:  <div line=""><br></div><div line="">|<br></div>

### parcialmente a primeira linha, segunda inteira e a terceira linha inteira

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line="">texto2</div><div line="">texto3|</div>
depois:  <div line="">tex</div><div line="">|<br></div>

### primeira linha inteira, segunda inteira e a terceira linha parcialmente

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2</div><div line="">tex|to3</div>
depois:  <div line=""><br></div><div line="">|to3</div>

### parcialmente a primeira linha, segunda inteira e a terceira linha parcialmente

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line="">texto2</div><div line="">tex|to3</div>
depois:  <div line="">tex</div><div line="">|to3</div>

## seleção começando na primeira linha e terminando na segunda

### primeira linha inteira, segunda inteira (terceira intocada)

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">texto2|</div><div line="">texto3</div>
depois:  <div line=""><br></div><div line="">|<br></div><div line="">texto3</div>

### parcialmente a primeira linha, segunda inteira (terceira intocada)

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line="">texto2|</div><div line="">texto3</div>
depois:  <div line="">tex</div><div line="">|<br></div><div line="">texto3</div>

### primeira linha inteira, segunda parcialmente (terceira intocada)

textbox.innerHTML:
antes:   <div line="">|texto1</div><div line="">tex|to2</div><div line="">texto3</div>
depois:  <div line=""><br></div><div line="">|to2</div><div line="">texto3</div>

### parcialmente a primeira linha, segunda parcialmente (terceira intocada)

textbox.innerHTML:
antes:   <div line="">tex|to1</div><div line="">tex|to2</div><div line="">texto3</div>
depois:  <div line="">tex</div><div line="">|to2</div><div line="">texto3</div>

## seleção começando na segunda linha e terminando na terceira

### segunda linha inteira, terceira inteira (primeira intocada)

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div><div line="">texto3|</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">|<br></div>

### segunda linha inteira, terceira parcialmente (primeira intocada)

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">|texto2</div><div line="">tex|to3</div>
depois:  <div line="">texto1</div><div line=""><br></div><div line="">|to3</div>

### segunda linha parcialmente, terceira inteira (primeira intocada)

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">tex|to2</div><div line="">texto3|</div>
depois:  <div line="">texto1</div><div line="">tex</div><div line="">|<br></div>

### segunda linha parcialmente, terceira parcialmente (primeira intocada)

textbox.innerHTML:
antes:   <div line="">texto1</div><div line="">tex|to2</div><div line="">tex|to3</div>
depois:  <div line="">texto1</div><div line="">tex</div><div line="">|to3</div>
