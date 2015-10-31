var https = require('https');
var fs = require('fs');
var app = require('./config/express')();

var options = {
	key : fs.readFileSync('./certificados/server.key'),
	cert : fs.readFileSync('./certificados/server.crt'),
	requestCert : false,
	rejectUnauthorized: false
};

var servidorSSL = https.createServer(options, app);

servidorSSL.listen(app.get('port'), function(){console.log('Servidor HTTPS iniciado na porta ' + app.get('port') + '. "ctrl" + "C" para encerrar' )});