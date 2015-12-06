var Aula = require('../models/aula.js');

module.exports = function()
{	
	var controlador = {}; //criação do objeto
	
	controlador.adicionarFrase = function(req, res) 
	{
		frase = {}; //objeto frase

		/*Captura das variaveis recebidas pelo metodo post*/

		reqDisciplina = req.body.disciplina;
		frase.texto = req.body.texto;
		frase.data = req.body.data;

		/*Query para adicionar frase no esquema Aula*/
		Aula.update({disciplina: reqDisciplina}, { $push: { frase : {"texto":  req.body.texto, "data": req.body.data} } }, function(erro, aula){

			if(erro)
				throw err;

			res.json(aula);

		});
		
	};

	controlador.exibeFrases = function(req, res) 
	{
		/*Exibe frases de acordo com a aula*/
		reqDisciplina = req.query.disciplina;

		Aula.find({disciplina: reqDisciplina},'frase', function(erro, frase){		
			if(erro)
				throw err;

			res.json(frase);
		});
	}
	
	return controlador; //retorna o objeto
}