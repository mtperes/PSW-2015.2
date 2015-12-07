/*
Express: framework para configuração do servidor. Instalado através da linha de comando com a instrução "npm install express@4.8 --save"
EJS: modelos para o lado do cliente. Instalado através da linha de comando com a instrução "npm install ejs --save"
*/
var express = require('express'); //armazena uma função q ao ser chamada retorna uma instância do módulo express
var bodyParser = require('body-parser');
//var load = require('express-load');


var pgTranscricao = require('../app/rota/servico_transcricao'); //função que define a rota "servico_transcricao" armazenada na variável pgtranscricao
var fala_convertida = require('../app/rota/fala_convertida'); //rota para a comunicação dos resultados obtidos que serão gravados no banco
var transcricao_temporaria = require('../app/rota/transcricao_temporaria'); //rota para a comunicação dos resultados temporários obtidos
var frasesDaAula = require('../app/rota/aulaCompleta');
var documentoDaAula = require('../app/rota/documento.js');
var aula = require('../app/rota/aula.js');
var frase = require('../app/rota/frase.js');

module.exports = function()
{
	var app = express(); //instância do servidor a ser retornada
	
	app.set('port', 8080); //porta a do servidor
	
	app.use(express.static('./publico')); //local dos arquivos "*.css", "*.js" e imagens
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	
	app.set('view engine', 'ejs'); //view engine usada
	app.set('views', './app/view'); //pasta a ser consultada pela view engine	
	
	//load('models', {cwd: 'app'}).then('controller').then('rota').into(app);
	
	
	//definição das rotas para a página de transcrição e para a transferência de dados entre cliente e servidor
	pgTranscricao(app);
	fala_convertida(app);
	transcricao_temporaria(app);
	frasesDaAula(app);
	documentoDaAula(app);
	aula(app);
	frase(app);
	
	
	return app; //instância configurada pelo framework
}