var Frase = require('../models/frases.js');

module.exports = function()
{	
	var controlador = {}; //criação do objeto
	
	controlador.documento = function(req, res) //definição da função correspondente ao método GET
	{
		var data = req.query.data; //variável enviada na URL
		var disciplina = req.query.disciplina;
		
		console.log(disciplina);
		
		Frase.find({aula: disciplina}, function(erro, frase){		
			if(erro)
				throw err;

			console.log(frase);
		});
	};
	
	return controlador; //retorna o objeto
}