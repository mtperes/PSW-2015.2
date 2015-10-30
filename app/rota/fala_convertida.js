var controlador = require('../controller/fala_convertida.js')(); //chama o controller responsável pelo serviço de transcrição

module.exports = function (app)
{
	app.get('/fala_convertida', controlador.textoDaFala); //GET do framework. 1º parâmetro: rota definina na URL. 2º parâmetro: função a ser executada
}