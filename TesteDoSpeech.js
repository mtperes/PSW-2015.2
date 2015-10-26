/*
Só funciona no chrome.
Código testado no editor online "http://jsfiddle.net" com o seguinte código html:

<body>
  <h1 id="texto">Teste de reconhecimento de fala</h1>
</body>

O navegador precisa estar configurado para sempre autorizar o uso do microfone pela página.
Do contrário, sucessivas autorizações precisarão ser concedidas para que o serviço seja reiniciado
*/

var reconhecimentoDeFala;
var texto = document.getElementById("texto");

if ( 'webkitSpeechRecognition' in window )
{	
	reconhecimentoDeFala = new webkitSpeechRecognition(); //objeto responsável pelo reconhecimento da fala
	reconhecimentoDeFala.continuous = false; //atributo que indica se a fala continuará sendo monitorada após o recebimento completo do primeiro resultado
	reconhecimentoDeFala.interimResults = true; //exibição dos resultados provisórios obtidos. A tela vai sendo alterada em tempo real
	reconhecimentoDeFala.lang = "pt-BR"; //idioma
	reconhecimentoDeFala.addEventListener("end", fimDaTranscricao);
	reconhecimentoDeFala.addEventListener("result", resultadoRecebido); //observa quando há mudança nos resultados provisórios ou definitivos
	reconhecimentoDeFala.addEventListener("error", function (erro){ console.log(erro); }); //caso haja erro ao carregar o speech

	reconhecimentoDeFala.start(); //inicia o reconhecimento de voz
}

//ao ser interrompido, o serviço é reativado
function fimDaTranscricao ()
{
  console.log("fim da transcricao");
  setTimeout(function (){ console.log("tentando reiniciar"); reconhecimentoDeFala.start(); } , 10);
}

//exibe o resultado da transcrição
function resultadoRecebido (evento)
{
	var transcrito = "";

	for (var i=0 ; i < event.results.length ; ++i)
		transcrito += event.results[i][0].transcript;
	
	texto.innerHTML = transcrito;
}
