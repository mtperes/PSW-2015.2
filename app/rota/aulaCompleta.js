var controlador = require('../controller/aulaCompleta.js')(); //chama o controller responsável pela aula completa

module.exports = function (app)
{
	app.get('/aulaCompleta', controlador.frasesDaAula); //GET do framework. 1º parâmetro: rota definina na URL. 2º parâmetro: função a ser executada
}