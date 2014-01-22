
var app = angular.module('Prediction',[]);


app.controller('ItemCtrl', ['$scope',
    function($scope){
        // $scope.modes = [
        //     'Healthy',
        //     'Indulgent'
        // ];
        // $scope.mode = mode ? mode : $scope.modes[0];
    }
]);

app.directive('sentence', function() {
    return {
        restrict: 'A',
        scope: {
            mode: '='
        },
        templateUrl: '/partials/sentence.html'
    };
});