
class CampoMinado {
    constructor(linhas = 18, colunas = 14, bombas = []) {
        if (linhas !== 18 || colunas !== 14) {
            throw new Error('O tabuleiro precisa ter 18 linhas e 14 colunas.');
        }

        if (!Array.isArray(bombas) || bombas.length !== 40) {
            throw new Error('É necessário informar exatamente 40 bombas.');
        }

        this.linhas = linhas;
        this.colunas = colunas;
        this.bombas = new Set();
        this.reveladas = new Set();
        this.marcadas = new Set();
        this.status = 'em_andamento';

        bombas.forEach(({ linha, coluna }) => {
            if (!this.posicaoValida(linha, coluna)) {
                throw new Error('Coordenada de bomba inválida.');
            }

            const posicao = this.converterPosicao(linha, coluna);

            if (this.bombas.has(posicao)) {
                throw new Error('Não podem existir bombas na mesma posição.');
            }

            this.bombas.add(posicao);
        });
    }

    converterPosicao(linha, coluna) {
        return `${linha}-${coluna}`;
    }

    posicaoValida(linha, coluna) {
        return Number.isInteger(linha) &&
            Number.isInteger(coluna) &&
            linha >= 0 &&
            linha < this.linhas &&
            coluna >= 0 &&
            coluna < this.colunas;
    }

    verificarPosicao(linha, coluna) {
        if (!this.posicaoValida(linha, coluna)) {
            throw new Error('Coordenadas fora do tabuleiro.');
        }
    }

    verificarPartida() {
        if (this.status !== 'em_andamento') {
            throw new Error('Não é possível continuar esta partida.');
        }
    }

    obterVizinhos(linha, coluna) {
        this.verificarPosicao(linha, coluna);

        const vizinhos = [];

        for (let l = linha - 1; l <= linha + 1; l++) {
            for (let c = coluna - 1; c <= coluna + 1; c++) {
                if (l === linha && c === coluna) {
                    continue;
                }

                if (this.posicaoValida(l, c)) {
                    vizinhos.push(this.converterPosicao(l, c));
                }
            }
        }

        return vizinhos;
    }

    contarBombas(linha, coluna) {
        const vizinhos = this.obterVizinhos(linha, coluna);

        return vizinhos.reduce((total, posicao) => {
            return total + (this.bombas.has(posicao) ? 1 : 0);
        }, 0);
    }

    revelar(linha, coluna) {
        this.verificarPartida();
        this.verificarPosicao(linha, coluna);

        const posicao = this.converterPosicao(linha, coluna);

        if (this.marcadas.has(posicao)) {
            throw new Error('Remova a marcação antes de revelar.');
        }

        if (this.reveladas.has(posicao)) {
            return false;
        }

        if (this.bombas.has(posicao)) {
            this.reveladas.add(posicao);
            this.status = 'perdeu';
            return 'bomba';
        }

        this.reveladas.add(posicao);

        const quantidadeSegura = 
            (this.linhas * this.colunas) - this.bombas.size;

        if (this.reveladas.size === quantidadeSegura) {
            this.status = 'venceu';
        }

        return this.contarBombas(linha, coluna);
    }

    alternarMarcacao(linha, coluna) {
        this.verificarPartida();
        this.verificarPosicao(linha, coluna);

        const posicao = this.converterPosicao(linha, coluna);

        if (this.reveladas.has(posicao)) {
            throw new Error('Não é possível marcar uma célula revelada.');
        }

        if (this.marcadas.has(posicao)) {
            this.marcadas.delete(posicao);
            return false;
        }

        this.marcadas.add(posicao);
        return true;
    }
}

module.exports = { CampoMinado };
