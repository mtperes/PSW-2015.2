module.exports = function()
{
	var controlador = {}; //criação do objeto
	
	controlador.textoDaFala = function(req, res) //definição da função correspondente ao método GET
	{
		var texto = req.query.transc; //variável enviada na URL
		
		if(!!texto) //somente se for um texto válido
		{
			console.log('fala transcrita: ' + texto); //printa o dado na console do servidor
			res.send(texto); //cria o html a partir do arquivo "teste3.ejs"
		}
	};
	
	return controlador; //retorna o objeto
}