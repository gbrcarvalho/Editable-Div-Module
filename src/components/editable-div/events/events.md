// Evento                         Por quê tratar                            Estado
//
// keydown Enter                  Manter estrutura de blocos                default Ok
// keydown Backspace/Delete       Evitar merge indesejado de blocos         default +/-Ok, falta onRange e testes
// keydown Ctrl+Z/Y               Undo/redo customizado se necessário       bloqueado, não depende do bloco
// paste                          Sanitizar HTML externo                    default +/-Ok, falta testes
// drop                           Bloquear ou sanitizar drag & drop         bloqueado, depende do bloco
// input                          Sincronizar estado e validar estrutura    TODO -> default Ok
// compositionstart/end           Suporte a IME                             não-será-implementado
