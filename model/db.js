var chalk = require('chalk');
var mongoose = require('mongoose');

var dbURI = 'mongodb://dbadmin:dbadmin@ds223738.mlab.com:23738/mk-employee-directory';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log(chalk.yellow('Mongoose connected to mlabs DB'));
});

mongoose.connection.on('error', function() {
    console.log(chalk.red('Mongoose ERROR...'));
});

mongoose.connection.on('disconnected', function() {
    console.log(chalk.red('Mongoose DISCONNECTED'));
});

var employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, default: '12/10/1990' },
    department: { type: String, default: 'Sales' },
    gender: { type: String, required: true },
    age: { type: Number }
});

// Pre save HOOK
employeeSchema.pre('save', function(next) {
    var employee = this;
    var age = (new Date()).getFullYear() - employee.dob.getFullYear();
    employee.age = age;
    next();
});

// Build the Employee model
mongoose.model('Employee', employeeSchema);