var controlador = require('../controller/servico_transcricao.js')(); //chama o controller responsável pelo serviço de transcrição

module.exports = function (app)
{
	app.get('/transcritor', controlador.transcritor); //GET do framework. 1º parâmetro: rota definina na URL. 2º parâmetro: função a ser executada
}