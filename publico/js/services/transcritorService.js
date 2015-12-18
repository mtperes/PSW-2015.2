'use strict';

myApp.factory('transcritorService', ['$rootScope', '$http',
    function($rootScope, $http) {

        var subscribers = [],
            rodando = false,
            reconhecimentoDeFala = null;

        function initRecognizer() {
            if ('webkitSpeechRecognition' in window) {
                reconhecimentoDeFala = new webkitSpeechRecognition(); //objeto responsável pelo reconhecimento da fala
                reconhecimentoDeFala.continuous = false; //atributo que indica se a fala continuará sendo monitorada após o recebimento completo do primeiro resultado
                reconhecimentoDeFala.interimResults = true; //não haverá exibição dos resultados provisórios obtidos. A tela será alterada somente quando a frase acabar

                //TODO vir das configurações!!
                reconhecimentoDeFala.lang = $rootScope.configuracao.LANGUAGE; //idioma
                reconhecimentoDeFala.addEventListener("end", fimDaTranscricao);
                reconhecimentoDeFala.addEventListener("result", resultadoRecebido); //observa quando há mudança nos resultados provisórios ou definitivos
                reconhecimentoDeFala.addEventListener("error", function (erro) {
                    console.log(erro);
                });

                //Adiciona às callbacks da transcrição uma que envia para o servidor a transcrição
                subscribers.push(function(date, texto, isFinal) {

                    var url = $rootScope.configuracao.URL_TRANSCRICAO_TEMPORARIA;

                    if (isFinal)
                        url = $rootScope.configuracao.URL_TRANSCRICAO_FINAL;
                    else
                        return;
                    //TODO comentar bloco acima

                    $http({
                        url: url,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            'date' : date,
                            'texto': texto
                        }
                    }).then(function (response){
                        console.log("Enviado ok!");
                    }, function(response) {
                        console.log("Enviado com erro");
                    });

                })
            }
            else
                throw new Error("Recurso não suportado por este navegador!!")
        }

        function resultadoRecebido(evento) {

            console.info(evento);

            angular.forEach(subscribers, function(callback){
                callback(new Date(), event.results[0][0].transcript, event.results[0].isFinal);
            });

        }

        function fimDaTranscricao() {
            console.log("fim da transcricao");
            if (rodando)
                setTimeout(function () {
                    console.log("tentando reiniciar");
                    reconhecimentoDeFala.start();
                }, 10);
        }

        /**
        *
        *   Métodos públicos do serviço
        */
        return {
            /**
             *
             * @param {function} ligarCallback - callback que será chamada quando o serviço for iniciado
             */
            ligarDesligar: function(ligarCallback)                 {

                if (rodando == false) {
                    if (reconhecimentoDeFala == null)
                        initRecognizer();

                    rodando = true;
                    reconhecimentoDeFala.onstart = ligarCallback;
                    reconhecimentoDeFala.start();
                } else {
                    rodando = false;
                }
            },

            /**
             *  Callback de resultado recebido da transcrição
             *
             *  @callback recebidoCallback
             *  @param {Date} date - data do recebimento
             *  @param {string} texto - texto da transcrição
             *  @param {boolean} isFinal - marca o final da transcrição
             */

            /**
             * @param {recebidoCallback} callback
             */
            inscrever: function(callback) {
                subscribers.push(callback);
            }
        }
    }
]);