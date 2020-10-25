const jwt = require('jsonwebtoken');
const Usuarios = require('../repositories/usuarios');
const cripto = require('../ultis/cripto');
const resposta = require('../ultis/resposta');
require('dotenv').config();

/**
 * Função de autentificação de usuário.
 * Retorna um token válido para corpo da requisição.
 * @param {object} ctx object
 */
const autenticar = async (ctx) => {
	const { email, senha } = ctx.request.body;

	if (!email || !senha) {
		return resposta(ctx, 400, { mensagem: 'Pedido mal-formatado.' });
	}

	const usuario = await Usuarios.obterUsuarioPeloEmail(email);

	if (usuario) {
		const senhaCorreta = await cripto.conferirHash(senha, usuario.senha);

		if (senhaCorreta) {
			const SEGREDO = process.env.JWT_SECRET || 'aBc@147';

			const token = await jwt.sign(
				{ id: usuario.id, email: usuario.email },
				SEGREDO,
				{
					expiresIn: '1h',
				}
			);

			return resposta(ctx, 200, { token });
		}
	}

	return resposta(ctx, 200, { mensagem: 'Email ou senha incorretos.' });
};

module.exports = { autenticar };
