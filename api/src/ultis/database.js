const { Client } = require('pg');

require('dotenv').config();

/**
 * Cria uma nova instâcia para a conexão com o banco de dados.
 */
const client = new Client({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	password: process.env.DB_PW,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	ssl: {
		rejectUnauthorized: false,
	},
});

/**
 * Executa a conexão com o banco de dados.
 */
client
	.connect()
	.then(() => console.log('connected'))
	.catch((err) => console.error('connection error', err.stack));

module.exports = client;
