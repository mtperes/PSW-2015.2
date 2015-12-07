var Aula = require('../models/aula.js');

module.exports = function()
{	
	var controlador = {}; //criação do objeto
	
	controlador.cadastrarAula = function(req, res) //definição da função correspondente ao método GET
	{
		
        		
		var aula = new Aula ({
			professor		: req.body.professor,
			disciplina		: req.body.disciplina,
			turno			: req.body.turno,
			periodo			: req.body.periodo,
			data			: req.body.data
		});
			
		aula.save();
			
		res.json(req.body);
		
	};

	controlador.exibeAulas = function(req, res) //definição da função correspondente ao método GET
	{

		Aula.find({}, function(erro, aulas){		
			if(erro)
				throw err;

			res.json(aulas);
		});

	}
	
	return controlador; //retorna o objeto
}