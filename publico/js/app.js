'use strict';

angular.module('myApp', [
    'ngMaterial'
]);

var myApp = angular.module('myApp');

myApp.run(function($rootScope, $http, $mdToast) {

    $http.get('config.json')
        .success(function(data) {

            $rootScope.configuracao = data;

        })
        .error(function(data,status,error,config){
            console.log("Erro! Impossivel carregar arquivo de configuração!");
        });

    //TODO remover daqui
    $rootScope.tosta = function(val) {
        $mdToast.show(
            $mdToast.simple()
                .content(val)
                .hideDelay(3000)
        );
    }

});


