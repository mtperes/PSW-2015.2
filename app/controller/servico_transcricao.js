module.exports = function()
{
	var controlador = {}; //criação do objeto
	
	controlador.transcritor = function(req, res) //definição da função correspondente ao método GET
	{
		res.render('teste3', {}); //cria o html a partir do arquivo "teste3.ejs"
	};
	
	return controlador; //retorna o objeto
}