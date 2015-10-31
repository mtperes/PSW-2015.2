module.exports = function()
{
	var controlador = {};
	
	controlador.transcTemp = function(req, res)
	{
		var texto = req.query.falaTemp;
		
		if(!!texto)
		{
			console.log("fala temporaria: " + texto);
			res.send(texto);
		}
	}
	
	return controlador;
}