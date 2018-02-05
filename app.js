var chalk = require('chalk');
var express = require('express');
var mongoose = require('mongoose');
var db = require('./model/db.js');

var empDB = require('./routes/empRoute.js');
var routes = require('./routes/route.js');

var employeeController = require('./controllers/empController.js');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/allemployees', empDB.employees);

app.post('/newEmployee', empDB.addEmployee);

app.post('/delete', empDB.deleteEmployee);

app.post('/update', empDB.updateEmployee);

app.use(function(req, res) {
    console.log(chalk.red("Error: 404" + req.error));
    res.status(404).render('404');
});

app.use(function(error, req, res, next) {
    console.log(chalk.red('Error : 500' + error))
    res.status(500).render('500');
});

var port = process.env.PORT || 8080;

var server = app.listen(port, function(req, res) {
    console.log(chalk.green("Catch the action at http://localhost:" + port));
});