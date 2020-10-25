const Brasileirao = require('../repositories/brasileirao');
const Classificacao = require('../ultis/classificacao');
const resposta = require('../ultis/resposta');

/**
 * Função retorna a classificação dos jogos do Brasileirão.
 * @param {object} ctx object
 */
const obterClassificacao = async (ctx) => {
	const jogosDoCampeonato = await Brasileirao.obterTodosJogos();
	const dados = Classificacao.organizarClassificacao(jogosDoCampeonato);

	return resposta(ctx, 200, dados);
};

/**
 * Função retorna os jogos da rodada do Brasileirão.
 * @param {object} ctx object
 */
const obterJogosDaRodada = async (ctx) => {
	const { rodada = null } = ctx.params;

	if (!rodada) {
		return resposta(ctx, 400, { mensagem: 'Pedido mal-formatado.' });
	}

	const dados = await Brasileirao.obterJogosDaRodada(rodada);
	return resposta(ctx, 200, dados);
};

/**
 * Função alterar o placar de um jogo específico do Brasileirão.
 * @param {object} ctx object
 */
const alterarPlacarDeJogo = async (ctx) => {
	const { id, golsCasa, golsVisitante } = ctx.request.body;

	if (id === null || golsCasa === null || golsVisitante === null) {
		return resposta(ctx, 400, { mensagem: 'Pedido mal-formatado.' });
	}

	const dados = await Brasileirao.alterarPlacarDeJogo(
		id,
		golsCasa,
		golsVisitante
	);

	return resposta(ctx, 200, dados);
};

module.exports = {
	obterClassificacao,
	obterJogosDaRodada,
	alterarPlacarDeJogo,
};
