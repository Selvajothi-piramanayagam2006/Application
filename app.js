
var app = angular.module("myApp", []);

app.service("myService", function() {
    this.msg = function() {
        return "Operation Successful!";
    };
});

app.factory("myFactory", function() {
    return {
        msg: function() {
            return "Management System";
        }
    };
});

app.controller("myCtrl", function($scope, $http, myService, myFactory) {
    var url = "http://localhost:5000/records";

    $scope.title = myFactory.msg();
    $scope.records = [];
    $scope.form = {};
    $scope.editing = false;

    $scope.load = function() {
        $http.get(url).then(function(res) {
            $scope.records = res.data;
        }, function() {
            $scope.message = "Cannot connect to server!";
        });
    };

    $scope.save = function() {
        if ($scope.editing) {
            $http.put(url + "/" + $scope.form._id, $scope.form)
            .then(function() {
                $scope.message = myService.msg();
                $scope.form = {};
                $scope.editing = false;
                $scope.load();
            });
        } else {
            $http.post(url, $scope.form)
            .then(function() {
                $scope.message = myService.msg();
                $scope.form = {};
                $scope.load();
            });
        }
    };

    $scope.edit = function(r) {
        $scope.form = angular.copy(r);
        $scope.editing = true;
        $scope.page = "add";
    };

    $scope.del = function(id) {
        $http.delete(url + "/" + id)
        .then(function() {
            $scope.message = myService.msg();
            $scope.load();
        });
    };

    $scope.load();
});