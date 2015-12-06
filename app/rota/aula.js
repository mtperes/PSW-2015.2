var controlador = require('../controller/aula.js')(); //chama o controller responsável pelo serviço de transcrição

module.exports = function (app)
{
	app.post('/aula', controlador.cadastrarAula); //GET do framework. 1º parâmetro: rota definina na URL. 2º parâmetro: função a ser executada
	app.get('/aula', controlador.exibeAulas);
}