const cripto = require('../ultis/cripto');
const resposta = require('../ultis/resposta');

/**
 * Função middleware que criptografa o password.
 * @param {object} ctx object
 * @param {function} next callback
 */
const encriptar = async (ctx, next) => {
	const { senha = null } = ctx.request.body;

	if (!senha) {
		resposta(ctx, 400, { mensagem: 'Pedido mal-formatado.' });
	}

	const hash = await cripto.criarHash(senha);
	ctx.state.hash = hash;

	return next();
};

module.exports = { encriptar };
