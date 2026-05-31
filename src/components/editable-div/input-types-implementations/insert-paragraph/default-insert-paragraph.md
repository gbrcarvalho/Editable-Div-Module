# Ao pressionar 'Enter' em um elemento editavel deve acontecer:

# * o caracter '|' representa a posição cursor, não aparece no texto final,
# * cada teste indica como fica o innerHTML do elemento editavel antes e depois de apertar 'Enter'
# * obviamente sem o cursor no texto.

# verificar se o cursor está colapsado

# esses casos abaixo descrevem o comportamento do enter com o cursor colapsado, ou seja, tipo 'Caret'
# uma unica linha:

1. enter com a linha vazia:

textbox.innerHTML:
antes:  <div>|<br></div>
depois: <div><br></div><div>|<br></div>

2. enter com texto na linha cursor no inicio:

textbox.innerHTML:
antes:  <div>|texto</div>
depois: <div><br></div><div>|texto</div>

3. enter com texto na linha cursor no meio:

textbox.innerHTML:
antes:  <div>tex|to</div>
depois: <div>tex</div><div>|to</div>

4. enter com texto na linha cursor no final:

textbox.innerHTML:
antes:   <div>texto|</div>
depois:  <div>texto</div><div>|<br></div>

# duas linhas:

## duas linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div>|<br></div><div><br></div>
depois:  <div><br></div><div>|<br></div><div><br></div>

2. enter na segunda linha:

textbox.innerHTML:
antes:   <div><br></div><div>|<br></div>
depois:  <div><br></div><div><br></div><div>|<br></div>

## primeira linha com texto e segunda linha vazia:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>|texto</div><div><br></div>
depois:  <div><br></div><div>|texto</div><div><br></div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>tex|to</div><div><br></div>
depois:  <div>tex</div><div>|to</div><div><br></div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto|</div><div><br></div>
depois:  <div>texto</div><div>|<br></div><div><br></div>

4. enter na segunda linha:

textbox.innerHTML:
antes:   <div>texto</div><div>|<br></div>
depois:  <div>texto</div><div><br></div><div>|<br></div>

## primeira linha vazia e segunda linha com texto:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div>|<br></div><div>texto</div>
depois:  <div><br></div><div>|<br></div><div>texto</div>

2. enter na segunda linha cursor no inicio:

textbox.innerHTML:
antes:   <div><br></div><div>|texto</div>
depois:  <div><br></div><div><br></div><div>|texto</div>

3. enter na segunda linha cursor no meio:

textbox.innerHTML:
antes:   <div><br></div><div>tex|to</div>
depois:  <div><br></div><div>tex</div><div>|to</div>

4. enter na segunda linha cursor no fim:

textbox.innerHTML:
antes:   <div><br></div><div>texto|</div>
depois:  <div><br></div><div>texto</div><div>|<br></div>

## duas linhas com texto:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>|texto1</div><div>texto2</div>
depois:  <div><br></div><div>|texto1</div><div>texto2</div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>tex|to1</div><div>texto2</div>
depois:  <div>tex</div><div>|to1</div><div>texto2</div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1|</div><div>texto2</div>
depois:  <div>texto1</div><div>|<br></div><div>texto2</div>

4. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>texto1</div><div>|texto2</div>
depois:  <div>texto1</div><div><br></div><div>|texto2</div>

5. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div>texto1</div><div>tex|to2</div>
depois:  <div>texto1</div><div>tex</div><div>|to2</div>

6. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1</div><div>texto2|</div>
depois:  <div>texto1</div><div>texto2</div><div>|<br></div>

# três linhas:

## três linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div>|<br></div><div><br></div><div><br></div>
depois:  <div><br></div><div>|<br></div><div><br></div><div><br></div>

2. enter na segunda linha:

textbox.innerHTML:
antes:   <div><br></div><div>|<br></div><div><br></div>
depois:  <div><br></div><div><br></div><div>|<br></div><div><br></div>

3. enter na terceira linha:

textbox.innerHTML:
antes:   <div><br></div><div><br></div><div>|<br></div>
depois:  <div><br></div><div><br></div><div><br></div><div>|<br></div>

## primeira linha com texto, segunda e terceira linhas vazias:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>|texto</div><div><br></div><div><br></div>
depois:  <div><br></div><div>|texto</div><div><br></div><div><br></div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>tex|to</div><div><br></div><div><br></div>
depois:  <div>tex</div><div>|to</div><div><br></div><div><br></div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto|</div><div><br></div><div><br></div>
depois:  <div>texto</div><div>|<br></div><div><br></div><div><br></div>

4. enter na segunda linha:

textbox.innerHTML:
antes:   <div>texto</div><div>|<br></div><div><br></div>
depois:  <div>texto</div><div><br></div><div>|<br></div><div><br></div>

5. enter na terceira linha:

textbox.innerHTML:
antes:   <div>texto</div><div><br></div><div>|<br></div>
depois:  <div>texto</div><div><br></div><div><br></div><div>|<br></div>

## segunda linha com texto, primeira e terceira linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div>|<br></div><div>texto</div><div><br></div>
depois:  <div><br></div><div>|<br></div><div>texto</div><div><br></div>

2. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div><br></div><div>|texto</div><div><br></div>
depois:  <div><br></div><div><br></div><div>|texto</div><div><br></div>

3. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div><br></div><div>tex|to</div><div><br></div>
depois:  <div><br></div><div>tex</div><div>|to</div><div><br></div>

4. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div><br></div><div>texto|</div><div><br></div>
depois:  <div><br></div><div>texto</div><div>|<br></div><div><br></div>

5. enter na terceira linha:

textbox.innerHTML:
antes:   <div><br></div><div>texto</div><div>|<br></div>
depois:  <div><br></div><div>texto</div><div><br></div><div>|<br></div>

## terceira linha com texto, primeira e segunda linhas vazias:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div>|<br></div><div><br></div><div>texto</div>
depois:  <div><br></div><div>|<br></div><div><br></div><div>texto</div>

2. enter na segunda linha:

textbox.innerHTML:
antes:   <div><br></div><div>|<br></div><div>texto</div>
depois:  <div><br></div><div><br></div><div>|<br></div><div>texto</div>

3. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div><br></div><div><br></div><div>|texto</div>
depois:  <div><br></div><div><br></div><div><br></div><div>|texto</div>

4. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div><br></div><div><br></div><div>tex|to</div>
depois:  <div><br></div><div><br></div><div>tex</div><div>|to</div>

5. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div><br></div><div><br></div><div>texto|</div>
depois:  <div><br></div><div><br></div><div>texto</div><div>|<br></div>

## primeira e segunda linhas com texto, terceira linha vazia:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>|texto1</div><div>texto2</div><div><br></div>
depois:  <div><br></div><div>|texto1</div><div>texto2</div><div><br></div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>tex|to1</div><div>texto2</div><div><br></div>
depois:  <div>tex</div><div>|to1</div><div>texto2</div><div><br></div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1|</div><div>texto2</div><div><br></div>
depois:  <div>texto1</div><div>|<br></div><div>texto2</div><div><br></div>

4. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>texto1</div><div>|texto2</div><div><br></div>
depois:  <div>texto1</div><div><br></div><div>|texto2</div><div><br></div>

5. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div>texto1</div><div>tex|to2</div><div><br></div>
depois:  <div>texto1</div><div>tex</div><div>|to2</div><div><br></div>

6. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1</div><div>texto2|</div><div><br></div>
depois:  <div>texto1</div><div>texto2</div><div>|<br></div><div><br></div>

7. enter na terceira linha:

textbox.innerHTML:
antes:   <div>texto1</div><div>texto2</div><div>|<br></div>
depois:  <div>texto1</div><div>texto2</div><div><br></div><div>|<br></div>

## primeira e terceira linhas com texto, segunda linha vazia:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>|texto1</div><div><br></div><div>texto3</div>
depois:  <div><br></div><div>|texto1</div><div><br></div><div>texto3</div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>tex|to1</div><div><br></div><div>texto3</div>
depois:  <div>tex</div><div>|to1</div><div><br></div><div>texto3</div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1|</div><div><br></div><div>texto3</div>
depois:  <div>texto1</div><div>|<br></div><div><br></div><div>texto3</div>

4. enter na segunda linha:

textbox.innerHTML:
antes:   <div>texto1</div><div>|<br></div><div>texto3</div>
depois:  <div>texto1</div><div><br></div><div>|<br></div><div>texto3</div>

5. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>texto1</div><div><br></div><div>|texto3</div>
depois:  <div>texto1</div><div><br></div><div><br></div><div>|texto3</div>

6. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>texto1</div><div><br></div><div>tex|to3</div>
depois:  <div>texto1</div><div><br></div><div>tex</div><div>|to3</div>

7. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1</div><div><br></div><div>texto3|</div>
depois:  <div>texto1</div><div><br></div><div>texto3</div><div>|<br></div>

## segunda e terceira linhas com texto, primeira linha vazia:

1. enter na primeira linha:

textbox.innerHTML:
antes:   <div>|<br></div><div>texto2</div><div>texto3</div>
depois:  <div><br></div><div>|<br></div><div>texto2</div><div>texto3</div>

2. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div><br></div><div>|texto2</div><div>texto3</div>
depois:  <div><br></div><div><br></div><div>|texto2</div><div>texto3</div>

3. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div><br></div><div>tex|to2</div><div>texto3</div>
depois:  <div><br></div><div>tex</div><div>|to2</div><div>texto3</div>

4. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div><br></div><div>texto2|</div><div>texto3</div>
depois:  <div><br></div><div>texto2</div><div>|<br></div><div>texto3</div>

5. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div><br></div><div>texto2</div><div>|texto3</div>
depois:  <div><br></div><div>texto2</div><div><br></div><div>|texto3</div>

6. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div><br></div><div>texto2</div><div>tex|to3</div>
depois:  <div><br></div><div>texto2</div><div>tex</div><div>|to3</div>

7. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div><br></div><div>texto2</div><div>texto3|</div>
depois:  <div><br></div><div>texto2</div><div>texto3</div><div>|<br></div>

## três linhas com texto:

1. enter na primeira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>|texto1</div><div>texto2</div><div>texto3</div>
depois:  <div><br></div><div>|texto1</div><div>texto2</div><div>texto3</div>

2. enter na primeira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>tex|to1</div><div>texto2</div><div>texto3</div>
depois:  <div>tex</div><div>|to1</div><div>texto2</div><div>texto3</div>

3. enter na primeira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1|</div><div>texto2</div><div>texto3</div>
depois:  <div>texto1</div><div>|<br></div><div>texto2</div><div>texto3</div>

4. enter na segunda linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>texto1</div><div>|texto2</div><div>texto3</div>
depois:  <div>texto1</div><div><br></div><div>|texto2</div><div>texto3</div>

5. enter na segunda linha com cursor no meio:

textbox.innerHTML:
antes:   <div>texto1</div><div>tex|to2</div><div>texto3</div>
depois:  <div>texto1</div><div>tex</div><div>|to2</div><div>texto3</div>

6. enter na segunda linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1</div><div>texto2|</div><div>texto3</div>
depois:  <div>texto1</div><div>texto2</div><div>|<br></div><div>texto3</div>

7. enter na terceira linha com cursor no inicio:

textbox.innerHTML:
antes:   <div>texto1</div><div>texto2</div><div>|texto3</div>
depois:  <div>texto1</div><div>texto2</div><div><br></div><div>|texto3</div>

8. enter na terceira linha com cursor no meio:

textbox.innerHTML:
antes:   <div>texto1</div><div>texto2</div><div>tex|to3</div>
depois:  <div>texto1</div><div>texto2</div><div>tex</div><div>|to3</div>

9. enter na terceira linha com cursor no fim:

textbox.innerHTML:
antes:   <div>texto1</div><div>texto2</div><div>texto3|</div>
depois:  <div>texto1</div><div>texto2</div><div>texto3</div><div>|<br></div>

# esses casos abaixo descrevem o comportamento do enter com o cursor não colapsado, ou seja, tipo 'Range' não
# importa a direção

# seleção contida numa única linha

textbox.innerHTML:
antes:   <div>t|ext|o</div>
depois:  <div>t</div><div>|o</div>

# seleção contendo uma única linha inteira

textbox.innerHTML:
antes:   <div>|texto|</div>
depois:  <div><br></div><div>|<br></div>

# seleção começando em uma linha e terminando em outra

# duas linhas inteiras

textbox.innerHTML:
antes:   <div>|texto</div><div>texto|</div>
depois:  <div><br></div><div>|<br></div>

# parcialmente a primeira linha e a segunda linha inteira

textbox.innerHTML:
antes:   <div>tex|to</div><div>texto|</div>
depois:  <div>tex</div><div>|<br></div>

# primeira linha inteira e a segunda linha parcialmente 

textbox.innerHTML:
antes:   <div>|texto</div><div>tex|to</div>
depois:  <div><br></div><div>|to</div>

# primeira linha parcialmente e a segunda linha parcialmente 

textbox.innerHTML:
antes:   <div>tex|to</div><div>tex|to</div>
depois:  <div>tex</div><div>|to</div>

# três linhas selecionadas:

## seleção começando na primeira linha e terminando na terceira

### três linhas inteiras selecionadas

textbox.innerHTML:
antes:   <div>|texto1</div><div>texto2</div><div>texto3|</div>
depois:  <div><br></div><div>|<br></div>

### parcialmente a primeira linha, segunda inteira e a terceira linha inteira

textbox.innerHTML:
antes:   <div>tex|to1</div><div>texto2</div><div>texto3|</div>
depois:  <div>tex</div><div>|<br></div>

### primeira linha inteira, segunda inteira e a terceira linha parcialmente

textbox.innerHTML:
antes:   <div>|texto1</div><div>texto2</div><div>tex|to3</div>
depois:  <div><br></div><div>|to3</div>

### parcialmente a primeira linha, segunda inteira e a terceira linha parcialmente

textbox.innerHTML:
antes:   <div>tex|to1</div><div>texto2</div><div>tex|to3</div>
depois:  <div>tex</div><div>|to3</div>

## seleção começando na primeira linha e terminando na segunda

### primeira linha inteira, segunda inteira (terceira intocada)

textbox.innerHTML:
antes:   <div>|texto1</div><div>texto2|</div><div>texto3</div>
depois:  <div><br></div><div>|<br></div><div>texto3</div>

### parcialmente a primeira linha, segunda inteira (terceira intocada)

textbox.innerHTML:
antes:   <div>tex|to1</div><div>texto2|</div><div>texto3</div>
depois:  <div>tex</div><div>|<br></div><div>texto3</div>

### primeira linha inteira, segunda parcialmente (terceira intocada)

textbox.innerHTML:
antes:   <div>|texto1</div><div>tex|to2</div><div>texto3</div>
depois:  <div><br></div><div>|to2</div><div>texto3</div>

### parcialmente a primeira linha, segunda parcialmente (terceira intocada)

textbox.innerHTML:
antes:   <div>tex|to1</div><div>tex|to2</div><div>texto3</div>
depois:  <div>tex</div><div>|to2</div><div>texto3</div>

## seleção começando na segunda linha e terminando na terceira

### segunda linha inteira, terceira inteira (primeira intocada)

textbox.innerHTML:
antes:   <div>texto1</div><div>|texto2</div><div>texto3|</div>
depois:  <div>texto1</div><div><br></div><div>|<br></div>

### segunda linha inteira, terceira parcialmente (primeira intocada)

textbox.innerHTML:
antes:   <div>texto1</div><div>|texto2</div><div>tex|to3</div>
depois:  <div>texto1</div><div><br></div><div>|to3</div>

### segunda linha parcialmente, terceira inteira (primeira intocada)

textbox.innerHTML:
antes:   <div>texto1</div><div>tex|to2</div><div>texto3|</div>
depois:  <div>texto1</div><div>tex</div><div>|<br></div>

### segunda linha parcialmente, terceira parcialmente (primeira intocada)

textbox.innerHTML:
antes:   <div>texto1</div><div>tex|to2</div><div>tex|to3</div>
depois:  <div>texto1</div><div>tex</div><div>|to3</div>
