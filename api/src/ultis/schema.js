/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const database = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS usuarios (
			id SERIAL,
			email TEXT NOT NULL,
			senha TEXT NOT NULL
	)`,
	2: `CREATE TABLE IF NOT EXISTS jogos (
			id SERIAL, 
			time_casa TEXT NOT NULL,
			time_visitante TEXT NOT NULL,
			gols_casa INT NOT NULL,
			gols_visitante INT NOT NULL,
			rodada INT NOT NULL
	)`,
	3: `
	CREATE TABLE IF NOT EXISTS times (
		id SERIAL,
		nome TEXT NOT NULL,
		imagem TEXT
 )`,
};

const drop = async (nomeDaTabela) => {
	if (nomeDaTabela) {
		await database.query(`DROP TABLE ${nomeDaTabela}`);
		console.log(`Tabela ${nomeDaTabela} dropada!`);
	}
};

const up = async (numero = null) => {
	if (!numero) {
		for (const valor in schema) {
			await database.query({ text: schema[valor] });
		}
	} else {
		await database.query({ text: schema[numero] });
	}
	console.log('Migração rodada!');
};

/**
 * Rode up(1) ou drop("nomeDaTabela");
 */

// up();
