**Rafaela Tanaka Cardoso 24062611-2**

**Vitor Hugo da Costa 23234248-2**

# Campo Minado – Casos de Teste

## Concepção do Desafio

O desafio consiste na criação de casos de teste para o jogo Campo Minado, utilizando JavaScript e o framework Jest.
O jogo possui um tabuleiro de 18 linhas por 14 colunas, totalizando 252 células, com 40 bombas espalhadas pelo tabuleiro.

O objetivo é testar as principais funcionalidades do jogo e verificar se elas estão funcionando corretamente, considerando situações que podem acontecer durante uma partida.

## Funcionamento dos Casos de Teste

Os casos de teste foram criados para simular diferentes situações do jogo. Cada teste realiza uma ação e verifica se o resultado obtido corresponde ao resultado esperado.

Foram considerados testes para:

- Criação do tabuleiro e verificação do seu tamanho.
- Quantidade de bombas e células sem bombas.
- Contagem de bombas nas células vizinhas.
- Revelação de células seguras.
- Revelação de células que possuem bombas.
- Marcação e desmarcação de células.
- Verificação de vitória do jogador.
- Tentativas de acessar posições inválidas do tabuleiro.

Os testes são executados utilizando o Jest, que verifica automaticamente se cada funcionalidade apresenta o resultado esperado. Caso o resultado seja diferente, o teste indica que houve uma falha.

## Casos de Teste

| ID | Cenário | Entrada / Ação | Resultado Esperado |
|---|---|---|---|
| CT01 | Criar tabuleiro | Criar um tabuleiro de 18 linhas e 14 colunas. | O tabuleiro deve ser criado com 18 linhas e 14 colunas. |
| CT02 | Quantidade de células | Verificar a quantidade total de células do tabuleiro. | O tabuleiro deve possuir 252 células. |
| CT03 | Quantidade de bombas | Criar um tabuleiro com 40 bombas. | Exatamente 40 células devem possuir bombas. |
| CT04 | Quantidade de células seguras | Verificar as células que não possuem bombas. | Devem existir 212 células sem bombas. |
| CT05 | Contar bombas vizinhas | Consultar uma célula cercada por 3 bombas. | O resultado da contagem deve ser 3. |
| CT06 | Célula sem bombas vizinhas | Consultar uma célula sem bombas ao redor. | O resultado da contagem deve ser 0. |
| CT07 | Célula no canto do tabuleiro | Consultar as bombas vizinhas da primeira célula do tabuleiro. | A contagem deve considerar somente as células existentes ao redor, sem gerar erro. |
| CT08 | Célula na borda do tabuleiro | Consultar as bombas vizinhas de uma célula localizada na borda. | A contagem deve ser realizada corretamente, sem acessar posições inexistentes. |
| CT09 | Revelar célula segura | Selecionar uma célula que não possui bomba. | A célula deve ser revelada. |
| CT10 | Revelar bomba | Selecionar uma célula que possui bomba. | O jogo deve identificar a explosão e indicar derrota. |
| CT11 | Revelar célula já revelada | Selecionar novamente uma célula que já foi revelada. | A célula deve permanecer revelada, sem alterar o estado do jogo. |
| CT12 | Marcar bomba | Marcar uma célula do tabuleiro. | A célula deve receber uma marcação. |
| CT13 | Desmarcar bomba | Marcar e depois desmarcar uma célula. | A marcação deve ser removida. |
| CT14 | Marcar célula já marcada | Marcar novamente uma célula que já possui marcação. | A marcação deve ser alternada, sem duplicação. |
| CT15 | Verificar vitória | Revelar todas as células que não possuem bombas. | O jogo deve identificar a vitória do jogador. |
| CT16 | Verificar vitória incompleta | Deixar uma célula sem bomba ainda escondida. | O jogo não deve indicar vitória. |
| CT17 | Posição inválida | Tentar revelar uma célula fora dos limites do tabuleiro, utilizando linha 18 e coluna 14. | A operação deve ser rejeitada, sem alterar o tabuleiro. |
| CT18 | Posição negativa | Tentar acessar uma célula utilizando linha e coluna negativas (-1, -1). | A operação deve ser rejeitada, sem alterar o tabuleiro. |

## Como executar os testes

Para executar os testes, é necessário ter o Node.js instalado.

Instale o Jest utilizando o comando:

```bash
npm install --save-dev jest
```

Depois, execute:

```bash
npx jest
```

## Resultado Esperado

Ao finalizar a execução, esperamos que todos os casos de teste sejam aprovados, mostrando que as funcionalidades verificadas estão apresentando os resultados esperados.
