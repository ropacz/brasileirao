const bcrypt = require('bcrypt');

/**
 * Função criptografia de senhas.
 * Retorna um hash.
 * @param {string} senha string
 */
const criarHash = async (senha) => {
	const hash = await bcrypt.hash(senha, 10);

	return hash;
};

/**
 * Função compara a senha e hash.
 * Retorna verdeiro ou falso.
 * @param {string} senha string
 * @param {string} hash string
 */
const conferirHash = async (senha, hash) => {
	const comparacao = await bcrypt.compare(senha, hash);
	return comparacao;
};

module.exports = { criarHash, conferirHash };
