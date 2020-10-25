const database = require('../ultis/database');

/**
 * Função retornar todos os jogos do Brasileirão.
 */
const obterTodosJogos = async () => {
	const query = `SELECT 
	time_casa,
	t1.imagem as escudo_time_casa,
	t2.imagem as escudo_time_visitante,
	time_visitante,
	gols_casa, 
	gols_visitante,
	(CASE WHEN (gols_casa = gols_visitante) THEN 1 ELSE (CASE WHEN (gols_casa > gols_visitante) then 3 else 0 END) END) as pontos_casa,
	(CASE WHEN (gols_casa = gols_visitante) THEN 1 ELSE (CASE WHEN (gols_casa < gols_visitante) then 3 else 0 END) END) as pontos_visitante,
	rodada 
	FROM jogos j
	inner join times t1 on t1.nome = j.time_casa 
	inner join times t2 on t2.nome = j.time_visitante 
	`;
	const resposta = await database.query(query);
	return resposta.rows;
};

/**
 * Função retornar todos os jogos que aconteceram na rodada.
 * @param {number} rodada number
 */
const obterJogosDaRodada = async (rodada) => {
	const query = {
		text: `SELECT * FROM jogos WHERE rodada = $1 order by id`,
		values: [rodada],
	};

	const resposta = await database.query(query);
	return resposta.rows;
};

/**
 * Função altera o placar de um jogo específico.
 * @param {number} id number
 * @param {number} golsCasa number
 * @param {number} golsVisitante number
 */
const alterarPlacarDeJogo = async (id, golsCasa, golsVisitante) => {
	const query = {
		text: `UPDATE jogos SET gols_casa = $1, gols_visitante = $2
						WHERE id = $3 RETURNING *`,
		values: [golsCasa, golsVisitante, id],
	};

	const resposta = await database.query(query);
	return resposta.rows.shift();
};

module.exports = { obterTodosJogos, obterJogosDaRodada, alterarPlacarDeJogo };
