///////////////////////////////////////////////////////////////////// variáveis do primeiro módulo ////////////////////////////////////////////////////////
var reconhecimentoDeFala;

///////////////////////////////////////////////////////////////////// variáveis do segundo módulo /////////////////////////////////////////////////////////
var texto = document.getElementById("texto");
var aulaTranscrita = document.getElementById("textoCorrido");


/////////////////////////////////////////////////////////////////////// código do primeiro módulo /////////////////////////////////////////////////////////

if ( 'webkitSpeechRecognition' in window )
{	
	reconhecimentoDeFala = new webkitSpeechRecognition(); //objeto responsável pelo reconhecimento da fala
	reconhecimentoDeFala.continuous = false; //atributo que indica se a fala continuará sendo monitorada após o recebimento completo do primeiro resultado
	reconhecimentoDeFala.interimResults = false; //não haverá exibição dos resultados provisórios obtidos. A tela será alterada somente quando a frase acabar
	reconhecimentoDeFala.lang = "pt-BR"; //idioma
	reconhecimentoDeFala.addEventListener("end", fimDaTranscricao);
	reconhecimentoDeFala.addEventListener("result", resultadoRecebido); //observa quando há mudança nos resultados provisórios ou definitivos
	reconhecimentoDeFala.addEventListener("error", function (erro){ console.log(erro); }); //caso haja erro ao carregar o speech

	reconhecimentoDeFala.start(); //inicia o reconhecimento de voz
}
else
	texto.innerHTML = "Este navegador não suporta o serviço de transcrição. Utilize o Chrome mais recente";

//ao ser interrompido, o serviço é reativado
function fimDaTranscricao ()
{
	console.log("fim da transcricao");
    setTimeout(function (){ console.log("tentando reiniciar"); reconhecimentoDeFala.start(); } , 10);
}

//exibe o resultado da transcrição
function resultadoRecebido (evento)
{
	var transcrito = ""; //variável que armazenará o texto que acabou de ser falado

	for (var i=0 ; i < event.results.length ; ++i) //preenche a variável com o resultado
		transcrito += event.results[i][0].transcript;
	
	atualizarAula(transcrito); //atualiza a seção que contém todo o texto da aula
}


/////////////////////////////////////////////////////////////////////// código do segundo módulo ///////////////////////////////////////////////////////////

//atualiza as seção que contêm o texto da aula.
function atualizarAula(falaTranscrita) 
{
	texto.innerHTML = falaTranscrita; //printa o texto que acabou de ser transcrito
	
	//AJAX padrão
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() 
	{
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
			inserirTrecho(xhttp.responseText) //envia a string retornada pelo servidor
		}
	}
	xhttp.open("GET", ("http://localhost:8080/fala_convertida?transc=" + falaTranscrita), true);
	xhttp.send();
}

//exibe o conteúdo que já foi registrado pelo servidor e devolvido
function inserirTrecho(frase)
{
	var linha = document.createElement("div"); //cria uma nova linha
	aulaTranscrita.appendChild(linha); //coloca essa linha como filha da seção que contém todo o texto da aula
	linha.innerHTML = frase; //exibe a frase transcrita
}