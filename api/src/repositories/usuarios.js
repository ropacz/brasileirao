const database = require('../ultis/database');

/**
 * Função obtém todos os usuários cadastrados.
 */
const obterUsuarios = async () => {
	const query = `SELECT * FROM usuarios`;

	const resposta = await database.query(query);

	return resposta.rows;
};

/**
 * Função obtém um usuário através do e-mail.
 * @param {string} email string
 */
const obterUsuarioPeloEmail = async (email) => {
	const query = {
		text: `SELECT * FROM usuarios WHERE email = $1`,
		values: [email],
	};

	const resposta = await database.query(query);

	return resposta.rows.shift();
};

/**
 * Função obtém um usuário através do ID.
 * @param {number} id number
 */
const obterUsuarioPeloId = async (id) => {
	const query = {
		text: `SELECT * FROM usuarios WHERE id = $1`,
		values: [id],
	};

	const resposta = await database.query(query);

	return resposta.rows.shift();
};

/**
 * Função cria um novo usuário no banco de dados.
 * @param {string} email string
 * @param {string} senha string
 */
const criarUsuario = async (email, senha) => {
	const query = {
		text: `INSERT INTO usuarios (email, senha)
						VALUES ($1, $2) RETURNING *`,
		values: [email, senha],
	};

	const resposta = await database.query(query);

	return resposta.rows.shift();
};

module.exports = {
	obterUsuarios,
	obterUsuarioPeloEmail,
	obterUsuarioPeloId,
	criarUsuario,
};
