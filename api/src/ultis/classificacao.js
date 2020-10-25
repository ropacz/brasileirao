/**
 * Função para gera os resultados de todos os jogos do campeonanto.
 * @private
 * @param {string} time string
 * @param {number} golsFeitos number
 * @param {number} golsSofridos number
 * @param {number} pontos number
 * @param {number} rodada number
 * @param {array} tabela array
 * @private
 */
const gerarResultados = (
	time,
	golsFeitos,
	golsSofridos,
	pontos,
	rodada,
	escudoImagem,
	tabela
) => {
	for (let j = 0; j < tabela.length; j++) {
		const timeAtual = tabela[j];

		if (timeAtual.nome === time) {
			timeAtual.pontos += pontos;
			timeAtual.partidas = rodada;
			timeAtual.empates += pontos === 1 ? 1 : 0;
			timeAtual.vitorias += pontos === 3 ? 1 : 0;
			timeAtual.derrotas += pontos === 0 ? 1 : 0;
			timeAtual.golsFeitos += golsFeitos;
			timeAtual.golsSofridos += golsSofridos;
			timeAtual.saldoDeGols += golsFeitos - golsSofridos;
			return;
		}
	}
	tabela.push({
		nome: time,
		pontos,
		partidas: rodada,
		empates: pontos === 1 ? 1 : 0,
		vitorias: pontos === 3 ? 1 : 0,
		derrotas: pontos === 0 ? 1 : 0,
		golsFeitos,
		golsSofridos,
		saldoDeGols: golsFeitos - golsSofridos,
		escudoImagem,
	});
};

/**
 * Função usada como callback do método Sort.
 * @private
 */
const ordernarTabelaPorPontos = (a, b) => {
	// * verifica se o número de pontos do time A é maior que o time B
	if (a.pontos > b.pontos) {
		return -1;
	}
	if (a.pontos < b.pontos) {
		return 1;
	}
	// * verifica se o número de vitorias do time A é maior que o time B
	if (a.vitorias > b.vitorias) {
		return -1;
	}
	if (a.vitorias < b.vitorias) {
		return 1;
	}
	// * verifica se o saldo de gols do time A é maior que o time B
	if (a.saldoDeGols > b.saldoDeGols) {
		return -1;
	}
	if (a.saldoDeGols < b.saldoDeGols) {
		return 1;
	}
	// * verifica se os gols feitos do time A é maior que o time B
	if (a.golsFeitos > b.golsFeitos) {
		return -1;
	}
	if (a.golsFeitos < b.golsFeitos) {
		return 1;
	}
	// * verifica se o nome do time A vem primeiro do nome time B
	return a.nome.localeCompare(b.nome);
};

/**
 * Função organiza a classificação com base nos jogos do campeonato.
 * @param {array} jogosDoCampeonato array of objects
 */
const organizarClassificacao = (jogosDoCampeonato) => {
	const tabela = [];

	for (let i = 0; i < jogosDoCampeonato.length; i++) {
		const {
			time_casa: timeCasa,
			time_visitante: timeVisitante,
			gols_casa: golsCasa,
			gols_visitante: golsVisitante,
			pontos_casa: pontosCasa,
			pontos_visitante: pontosVisitante,
			escudo_time_casa: escudoTimeCasa,
			escudo_time_visitante: escudoTimeVisitante,
			rodada,
		} = jogosDoCampeonato[i];

		gerarResultados(
			timeCasa,
			golsCasa,
			golsVisitante,
			pontosCasa,
			rodada,
			escudoTimeCasa,
			tabela
		);

		gerarResultados(
			timeVisitante,
			golsVisitante,
			golsCasa,
			pontosVisitante,
			rodada,
			escudoTimeVisitante,
			tabela
		);
	}

	if (tabela.length > 0) {
		tabela.sort(ordernarTabelaPorPontos);
	}

	return tabela;
};

module.exports = { organizarClassificacao };
