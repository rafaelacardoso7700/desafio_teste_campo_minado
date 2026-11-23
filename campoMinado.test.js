
const { CampoMinado } = require('./CampoMinado');

function montarBombas() {
    const lista = [];

    for (let linha = 0; linha < 18; linha++) {
        for (let coluna = 0; coluna < 14; coluna++) {
            if (lista.length < 40) {
                lista.push({ linha, coluna });
            }
        }
    }

    return lista;
}

function iniciarJogo() {
    return new CampoMinado(18, 14, montarBombas());
}

describe('Campo Minado - Testes', () => {

    let jogo;

    beforeEach(() => {
        jogo = iniciarJogo();
    });

    test('CT01 - Deve criar um tabuleiro de 18 por 14', () => {
        expect(jogo.linhas).toBe(18);
        expect(jogo.colunas).toBe(14);
    });

    test('CT02 - Deve possuir 252 células', () => {
        expect(jogo.linhas * jogo.colunas).toBe(252);
    });

    test('CT03 - Deve possuir exatamente 40 bombas', () => {
        expect(jogo.bombas.size).toBe(40);
    });

    test('CT04 - Deve possuir 212 células sem bombas', () => {
        const totalSeguras = 252 - jogo.bombas.size;

        expect(totalSeguras).toBe(212);
    });

    test('CT05 - Deve contar corretamente as bombas vizinhas', () => {
        expect(jogo.contarBombas(3, 0)).toBe(2);
    });

    test('CT06 - Deve identificar uma célula sem bombas ao redor', () => {
        expect(jogo.contarBombas(5, 5)).toBe(0);
    });

    test('CT07 - Deve contar bombas corretamente no canto do tabuleiro', () => {
        expect(jogo.contarBombas(0, 0)).toBe(3);
    });

    test('CT08 - Deve contar bombas corretamente na borda', () => {
        expect(jogo.contarBombas(0, 5)).toBe(5);
    });

    test('CT09 - Deve revelar uma célula sem bomba', () => {
        const resultado = jogo.revelar(3, 5);

        expect(jogo.reveladas.has('3-5')).toBe(true);
        expect(resultado).not.toBe('bomba');
    });

    test('CT10 - Deve encerrar a partida ao revelar uma bomba', () => {
        const resultado = jogo.revelar(0, 0);

        expect(resultado).toBe('bomba');
        expect(jogo.status).toBe('perdeu');
    });

    test('CT11 - Não deve revelar novamente uma célula já revelada', () => {
        jogo.revelar(5, 5);

        const resultado = jogo.revelar(5, 5);

        expect(resultado).toBe(false);
        expect(jogo.reveladas.size).toBe(1);
    });

    test('CT12 - Deve marcar uma célula corretamente', () => {
        const resultado = jogo.alternarMarcacao(5, 5);

        expect(resultado).toBe(true);
        expect(jogo.marcadas.has('5-5')).toBe(true);
    });

    test('CT13 - Deve remover a marcação de uma célula', () => {
        jogo.alternarMarcacao(5, 5);
        jogo.alternarMarcacao(5, 5);

        expect(jogo.marcadas.has('5-5')).toBe(false);
    });

    test('CT14 - Deve alternar a marcação da mesma célula', () => {
        expect(jogo.alternarMarcacao(5, 5)).toBe(true);
        expect(jogo.alternarMarcacao(5, 5)).toBe(false);
    });

    test('CT15 - Deve identificar a vitória ao revelar todas as células seguras', () => {
        for (let linha = 0; linha < 18; linha++) {
            for (let coluna = 0; coluna < 14; coluna++) {
                const posicao = `${linha}-${coluna}`;

                if (!jogo.bombas.has(posicao)) {
                    jogo.revelar(linha, coluna);
                }
            }
        }

        expect(jogo.status).toBe('venceu');
    });

    test('CT16 - Não deve indicar vitória enquanto existir célula segura escondida', () => {
        jogo.revelar(5, 5);

        expect(jogo.status).toBe('em_andamento');
    });

    test('CT17 - Deve rejeitar coordenadas fora do tabuleiro', () => {
        expect(() => jogo.revelar(18, 14))
            .toThrow('Coordenadas fora do tabuleiro.');
    });

    test('CT18 - Deve rejeitar coordenadas negativas', () => {
        expect(() => jogo.revelar(-1, -1))
            .toThrow('Coordenadas fora do tabuleiro.');
    });

});
