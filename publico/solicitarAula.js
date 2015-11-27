var frasesDaAula = document.getElementById("frases");

function enviarReq(){
	var disciplina = document.forms["descDaAula"]["sigla"].value;
	var dia = document.forms["descDaAula"]["dia"].value;
	var mes = document.forms["descDaAula"]["mes"].value;
	var ano = document.forms["descDaAula"]["ano"].value;
	
	ano+=mes;
	ano+=dia;
		
	puxarAula(ano, disciplina, "documento", frasesDaAula);
}

function puxarAula(data, disciplina, rota, local) 
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
	xhttp.open("GET", ("https://localhost:8080/" + rota + "?data=" + data + "&disciplina=" + disciplina), true);
	xhttp.send();
}

function inserirTrecho (frase, elemento)
{
	elemento.innerHTML = frase; //exibe a frase transcrita
}