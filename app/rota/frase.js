var controlador = require('../controller/frase.js')(); //chama o controller responsavel pelos metodos get e post

module.exports = function (app)
{
	app.post('/frase', controlador.adicionarFrase); // metodo responsavel por adicionar frase
	app.get('/frase', controlador.exibeFrases); // metodo responsavel por retornar frase
}