var Frase = require('../models/frases.js');

module.exports = function()
{	
	var controlador = {}; //criação do objeto
	
	controlador.textoDaFala = function(req, res) //definição da função correspondente ao método GET
	{
		var texto = "";

		//TODO
		//atualizar para apenas dados no corpo da requisicao
		if (req.body.texto != null)
			texto = req.body.texto;
		else
			texto = req.query.transc; //variável enviada na URL
		
		if(!!texto) //somente se for um texto válido
		{
			console.log('fala transcrita: ' + texto); //printa o dado na console do servidor

			var frase = new Frase ({
			aula		: "psw",
			data		: new Date(),
			frase		: texto});
			
			frase.save();

			res.send(texto); //cria o html a partir do arquivo "teste3.ejs"
		}
	};
	
	return controlador; //retorna o objeto
}