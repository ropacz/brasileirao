/**
 * Função retorna uma resposta para o corpo da requisição.
 * @param {object} ctx object
 * @param {number} code number
 * @param {object} dados object
 */
const resposta = (ctx, code, dados) => {
	const status = code >= 200 && code <= 399 ? 'sucesso' : 'erro';
	ctx.status = code;
	ctx.body = {
		status,
		dados,
	};
};

module.exports = resposta;
