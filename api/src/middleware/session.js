const jwt = require('jsonwebtoken');
const resposta = require('../ultis/resposta');
require('dotenv').config();

/**
 * Função verifica se o token enviado pelo usuário é válido.
 * @param {object} ctx object
 * @param {function} next callback
 */
const verificar = async (ctx, next) => {
	const { authorization = null } = ctx.headers;

	if (!authorization || authorization === 'Bearer ') {
		return resposta(ctx, 403, { mensagem: 'Ação proibida.' });
	}

	try {
		const [, token] = authorization.split(' ');
		const verificacao = await jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.usuarioId = verificacao.id;
		ctx.state.email = verificacao.email;
	} catch (erro) {
		console.log(erro);
		return resposta(ctx, 403, { mensagem: 'Ação proibida.' });
	}
	return next();
};

module.exports = { verificar };
