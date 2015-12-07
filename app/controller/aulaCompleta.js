module.exports = function()
{
	var controlador = {}; //criação do objeto
	
	controlador.frasesDaAula = function(req, res) //definição da função correspondente ao método GET
	{
		res.render('aulaCompleta', {}); //cria o html a partir do arquivo "aulaCompleta.ejs"
	};
	
	return controlador; //retorna o objeto
}