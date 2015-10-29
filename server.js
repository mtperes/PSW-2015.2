var http = require('http');
var app = require('./config/express')();

var servidor = http.createServer(app);

servidor.listen(app.get('port'), function(){console.log('Servidor iniciado na porta ' + app.get('port') + '. "ctrl" + "C" para encerrar' )});