module.exports.employeeCtrl = function() {
    var e = [{
            name: "Manish",
            email: "mk@dd.com",
            dob: "16-June-1988",
            department: "design",
            gender: "M",
            age: 29
        },
        {
            name: "Kaushal",
            email: "mk@dd.com",
            dob: "16-June-1988",
            department: "design",
            gender: "M",
            age: 29
        },
        {
            name: "Kaushal",
            email: "mk@dd.com",
            dob: "16-June-1988",
            department: "design",
            gender: "M",
            age: 29
        }
    ];

    this.employees = e;

    $http.get("/allemployees").then(function(response) { $scope.liveEmployees = response.data; });

    this.addEmployee = function(req, res) {
        $http.post('http://localhost:8080/newEmployee', req, []);
    };


};