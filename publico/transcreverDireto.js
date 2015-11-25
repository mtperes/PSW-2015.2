///////////////////////////////////////////////////////////////////// variáveis do contexto de controle ////////////////////////////////////////////////////////

var reconhecimentoDeFala;

var frase = (function ()
					{
						var frase = ""; //variável privada. Encapsulada pela closura
	
						return{
							armazenar : function(transcrito) //método que armazena dado na variável privada
							{
								if(typeof transcrito === 'string')
									frase = transcrito; //preenche a variável com o resultado da transcrição
							},
							recuperar : function() //método que recupera dado da variável privada
							{
								return frase;
							}
						};
					}
			)();

///////////////////////////////////////////////////////////////////// variáveis do contexto visual /////////////////////////////////////////////////////////

var texto = document.getElementById("texto");
var linhaTransc;
var aulaTranscrita = document.getElementById("textoCorrido");

/////////////////////////////////////////////////////////////////////// código do contexto de controle /////////////////////////////////////////////////////////

if ( 'webkitSpeechRecognition' in window )
{	
	reconhecimentoDeFala = new webkitSpeechRecognition(); //objeto responsável pelo reconhecimento da fala
	reconhecimentoDeFala.continuous = false; //atributo que indica se a fala continuará sendo monitorada após o recebimento completo do primeiro resultado
	reconhecimentoDeFala.interimResults = true; //não haverá exibição dos resultados provisórios obtidos. A tela será alterada somente quando a frase acabar
	reconhecimentoDeFala.lang = "pt-BR"; //idioma
	reconhecimentoDeFala.addEventListener("end", fimDaTranscricao);
	reconhecimentoDeFala.addEventListener("result", resultadoRecebido); //observa quando há mudança nos resultados provisórios ou definitivos
	reconhecimentoDeFala.addEventListener("error", function (erro){ console.log(erro); }); //caso haja erro ao carregar o speech

	reconhecimentoDeFala.start(); //inicia a transcrição
}
else
	texto.innerHTML = "Este navegador não suporta o serviço de transcrição. Utilize o Chrome mais recente";

//ao ser interrompido, o serviço é reativado
function fimDaTranscricao ()
{
	tratarTransc(frase.recuperar(), "fala_convertida?transc", linhaTransc); //atualiza a seção que contém todo o texto da aula
	console.log("fim da transcricao");
    setTimeout(function (){ console.log("tentando reiniciar"); reconhecimentoDeFala.start(); frase.armazenar("");} , 10);
}

//exibe o resultado da transcrição
function resultadoRecebido (evento)
{
	frase.armazenar(event.results[0][0].transcript); //armazena o resultado temporário na variável global "frase"
	linhaTransc = criarLinha (); //cria uma linha na seção que guarda o histórico da aula para mais tarde guardar o resultado final
	tratarTransc(event.results[0][0].transcript, "transcricao_temporaria?falaTemp", texto); //envia ao servidor e ao elemento "texto" (do html) o resultado provisório
}

//envia para o servidor o texto provisório ou o texto definitivo dependendo da "variável" e imprime a resposta na seção definida por "local"
function tratarTransc(falaTranscrita, rotaVariavel, local) 
{	
	//AJAX padrão
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function() 
	{
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
			inserirTrecho(xhttp.responseText, local); //printa a string retornada pelo servidor no elemento armazenado em "local"
		}
	}
	xhttp.open("GET", ("https://localhost:8080/" + rotaVariavel + "=" + falaTranscrita), true);
	xhttp.send();
}

/////////////////////////////////////////////////////////////////////// código do contexto visual ///////////////////////////////////////////////////////////

//exibe o conteúdo que já foi registrado pelo servidor e devolvido para o cliente
function inserirTrecho (frase, elemento)
{
	elemento.innerHTML = frase; //exibe a frase transcrita
}

//insere uma linha na seção que guarda o histórico da aula
function criarLinha ()
{
	var linha = document.createElement("div"); //cria uma nova linha
	aulaTranscrita.appendChild(linha); //coloca essa linha como filha da seção que contém todo o texto da aula
	return linha; //retorna o elemento criado
}




