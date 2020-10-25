const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');

const server = new Koa();
server.use(cors());

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 8081;

server.use(bodyparser());
server.use(router.routes());

server.listen(PORT, () => console.log(`servidor rodando em localhost:${PORT}`));
