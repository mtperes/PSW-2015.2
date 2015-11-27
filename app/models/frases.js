var mongoose = require('mongoose');

if(!!mongoose)
{
	console.log('kct');
	mongoose.connect('mongodb://localhost/transcritor');
	
}

var Schema = mongoose.Schema;
	
var esquema = new Schema({
	aula		: { type: String, required: true },
	data		: { type: Date },
	frase		: { type: String, required: true},
	}, {
	versionKey	: false
});

var modelo =  mongoose.model('frase', esquema);

/*
modelo.find(({aula: "psw"}, function(erro, frase){
		
		if(erro)
			throw err;
		
		console.log(frase);
	}));
*/

module.exports = modelo;