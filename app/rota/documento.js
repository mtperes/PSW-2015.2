var controlador = require('../controller/documento.js')(); //chama o controller responsável pelo serviço de transcrição

module.exports = function (app)
{
	app.get('/documento', controlador.documento); //GET do framework. 1º parâmetro: rota definina na URL. 2º parâmetro: função a ser executada
}