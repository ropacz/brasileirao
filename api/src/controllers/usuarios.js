const Usuarios = require('../repositories/usuarios');
const resposta = require('../ultis/resposta');

/**
 * Função cria um novo usuário no banco de dados.
 * @param {object} ctx object
 */
const criarUsuario = async (ctx) => {
	const { email } = ctx.request.body;
	const { hash } = ctx.state;

	const usuarioExiste = await Usuarios.obterUsuarioPeloEmail(email);

	if (usuarioExiste) {
		return resposta(ctx, 400, { mensagem: 'Usuário já existe.' });
	}

	const dados = await Usuarios.criarUsuario(email, hash);

	return resposta(ctx, 200, dados);
};

module.exports = { criarUsuario };
