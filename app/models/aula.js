var mongoose = require('mongoose');

var Schema = mongoose.Schema;
	
var esquema = new Schema({
	professor		: { type: String},
	disciplina		: { type: String},
	turno			: { type: String},
	periodo			: { type: String},
	data			: {type: String},
	frase			: [{texto: String, data: String, versionKey	: false}],
	}, {
	versionKey	: false
});

var modelo =  mongoose.model('aula', esquema);

module.exports = modelo;