var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.employees = function(req, res) {
    Employee.find({}, function(err, employeeData) {
        //res.render('home',{stories:stories,session:req.session});
        res.json(employeeData);
    });
};

exports.addEmployee = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var dob = req.body.dob;
    var dept = req.body.department;
    var gender = req.body.gender;
    console.log("Saving employee : " + name);

    var newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.dob = dob;
    newEmployee.department = dept;
    newEmployee.gender = gender;

    newEmployee.save(function(err, savedEmployee) {
        if (err) {
            console.log("Error : While saving the Employee: " + err);
            return res.status(500).send();
        } else {
            console.log("Employee saved: " + savedEmployee._id);
            res.status(200).send(savedEmployee);
        }
    });
};

exports.deleteEmployee = function(req, res) {
    console.log("DELETING employee : " + req.body._id);
    Employee.findOneAndRemove({ _id: req.body._id }, function(err) {
        if (err) {
            console.log("Error : DELETING Employee: " + err);
            return res.status(500).send();
        } else {
            console.log("Employee DELETED: " + req.body._id);
            res.status(200).send();
        }
    });
};

exports.updateEmployee = function(req, res) {
    console.log("UPDATING employee : " + req.body._id);
    req.body.age = (new Date()).getFullYear() - (new Date(req.body.dob)).getFullYear();
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, function(err) {
        if (err) {
            console.log("Error : UPDATING Employee: " + err);
            return res.status(500).send();
        } else {
            console.log("Employee UPDATED: " + req.body.name);
            res.status(200).send();
        }
    });
};