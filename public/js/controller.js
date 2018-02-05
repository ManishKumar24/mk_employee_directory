(function() {
    var app = angular.module('EmpDirApp', []);
    app.controller('empController', ['$scope', '$http', function($scope, $http) {

        this.liveEmployees = [];

        // the new or update employee
        $scope.employee = {};
        // this.employees = EmployeeService.get();

        $http.get("/allemployees").then(function(response) {
            $scope.liveEmployees = response.data;
            console.log("employees: " + response.data);
        });

        $scope.addEmployee = function(newEmployee) {
            $http.post('/newEmployee', newEmployee, []).then(function(response) {
                newEmployee.age = (new Date()).getFullYear() - (new Date(newEmployee.dob)).getFullYear();
                newEmployee._id = response._id;
                $scope.liveEmployees.push(newEmployee);
                $scope.employee = {};
            });
        };

        $scope.updateEmployee = function(employee) {
            $http.post('/update', employee, []).then(function(response) {
                $scope.employee = {};
                var index = $scope.liveEmployees.indexOf(employee);
                if (index >= 0) {
                    employee.age = (new Date()).getFullYear() - (new Date(employee.dob)).getFullYear();
                    $scope.liveEmployees[index] = employee;
                }
            });
        };

        $scope.editEmployee = function(employee) {
            $scope.employee = employee;
        };

        $scope.removeEmployee = function(employee) {
            $http.post('/delete', employee, []).then(function(response) {
                var index = $scope.liveEmployees.indexOf(employee);
                if (index >= 0) {
                    $scope.liveEmployees.splice(index, 1);
                }
            });
        };
    }]);
})();