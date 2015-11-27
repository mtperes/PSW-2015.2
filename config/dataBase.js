var mongoose = require('mongoose');

module.exports = function(uri){
		
	mongoose.connection.on('connected', function(){
		console.log('mongoose conectado de ' + uri);
	});
	
	mongoose.connection.on('disconnected', function(){
		console.log('mongoose desconectado de ' + uri);
	});
	
	mongoose.connection.on('error', function(){
		console.log('erro na conexão do mongoose com ' + uri);
	});
	
	process.on('SIGINT', function(){
		
		mongoose.connection.close(function(){
			console.log('servidor encerrado, fim da conexao com o banco');
			
			process.exit(0);
		});
		
	});
};