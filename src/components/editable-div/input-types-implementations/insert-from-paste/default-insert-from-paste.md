# Ao disparar o evento 'paste' em um elemento editavel deve acontecer:

# * o caracter '|' representa a posição cursor, não aparece no texto final,
# * cada teste indica como fica o innerHTML do elemento editavel antes e depois do 'paste'
# * obviamente sem o cursor no texto.

# verificar se o cursor está colapsado, caso não esteja, falta especificar o comportamento

# esses casos abaixo descrevem o comportamento do insertFromPaste com o cursor colapsado, ou seja, tipo 'Caret'

# uma unica linha:

1. paste com a linha vazia e cursor colapsado em cima:

textbox.innerHTML:
antes:  <div>|<br></div>
depois: <div>paste|</div>

2. paste com texto e cursor colapsado no inicio: 

textbox.innerHTML:
antes:  <div>|texto</div>
depois: <div>paste|texto</div>

3. paste com texto e cursor colapsado no meio: 

textbox.innerHTML:
antes:  <div>tex|to</div>
depois: <div>texpaste|to</div>

4. paste com texto e cursor colapsado no fim: 

textbox.innerHTML:
antes:   <div>texto|</div>
depois:  <div>textopaste|</div>

# duas linhas:

1. paste1\npaste2 com a linha vazia e cursor colapsado em cima:

textbox.innerHTML:
antes:  <div>|<br></div>
depois: <div>paste1</div><div>paste2|</div>

2. paste com texto e cursor colapsado no inicio: 

textbox.innerHTML:
antes:  <div>|texto</div>
depois: <div>paste1</div><div>paste2|texto</div>

3. paste com texto e cursor colapsado no meio: 

textbox.innerHTML:
antes:  <div>tex|to</div>
depois: <div>texpaste1</div><div>paste2|to</div>

4. paste com texto e cursor colapsado no fim: 

textbox.innerHTML:
antes:   <div>texto|</div>
depois:  <div>textopaste1</div><div>paste2|</div>
