var controlador = require('../controller/aula.js')(); //chama o controller responsável por frase

module.exports = function (app)
{
	app.post('/aula', controlador.cadastrarAula);// metodo responsavel por adiciona frase
	app.get('/aula', controlador.exibeAulas); // metodo responsavel por exibe aula
}
