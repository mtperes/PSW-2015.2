'use strict';

myApp.controller('transcritorController', ['$scope', '$rootScope', "transcritorService",
    function($scope, $rootScope, transcritorService) {

        /**
         * Evento disparado logo apos a view associada a este controlador
         * ser carregada.
         */
        $scope.$watch('$viewContentLoaded', function(){

            $scope.frases = [];
            $scope.transcricao_temporaria = null;
            $scope.contador = 0;

            transcritorService.inscrever(function(date, texto, isFinal){

                var transc = {
                    texto: texto,
                    date: date,
                    getClass: function() {
                        if (this.seq % 2 == 0)
                            return "par";

                        return "impar";
                    }
                };

                if (isFinal) {
                    transc.seq = ++$scope.contador;
                    $scope.frases.push(transc);
                } else {
                    $scope.transcricao_temporaria = transc;
                }

            });

        });

        $scope.ligarDesligar = function(){
            transcritorService.ligarDesligar(function(){

                console.log("Serviço ligado!");

            });
        }

    }
]);