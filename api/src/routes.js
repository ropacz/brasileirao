const Router = require('koa-router');

const router = new Router();

const BrasileiraoController = require('./controllers/brasileirao');
const AuthController = require('./controllers/auth');
const UsuariosController = require('./controllers/usuarios');
const EncriptarMiddleware = require('./middleware/encriptar');
const SessionMiddleware = require('./middleware/session');

/* Rota de autenficação na aplicação. */
router.post('/auth', AuthController.autenticar);

/* Rotas para usuários */
router.post(
	'/usuarios',
	SessionMiddleware.verificar,
	EncriptarMiddleware.encriptar,
	UsuariosController.criarUsuario
);
/* Rotas classificação */
router.get('/classificacao', BrasileiraoController.obterClassificacao);

/* Rotas jogos */
router.get('/jogos/:rodada(\\d+)', BrasileiraoController.obterJogosDaRodada);
router.put(
	'/jogos',
	SessionMiddleware.verificar,
	BrasileiraoController.alterarPlacarDeJogo
);

module.exports = router;
