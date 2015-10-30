/*
Express: framework para configuração do servidor. Instalado através da linha de comando com a instrução "npm install express@4.8 --save"
EJS: modelos para o lado do cliente. Instalado através da linha de comando com a instrução "npm install ejs --save"
*/
var express = require('express'); //armazena uma função q ao ser chamada retorna uma instância do módulo express

var pgTranscricao = require('../app/rota/servico_transcricao'); //função que define a rota "servico_transcricao" armazenada na variável pgtranscricao
var fala_convertida = require('../app/rota/fala_convertida');

module.exports = function()
{
	var app = express(); //instância do servidor a ser retornada
	
	app.set('port', 8080); //porta a do servidor
	
	app.use(express.static('./publico')); //local dos arquivos "*.css", "*.js" e imagens
	
	app.set('view engine', 'ejs'); //view engine usada
	app.set('views', './app/view'); //pasta a ser consultada pela view engine	
	
	pgTranscricao(app); //definição da rota para a página de transcrição
	fala_convertida(app);
	
	return app; //instância configurada pelo framework
}