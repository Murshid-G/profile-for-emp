
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override');
 
var port     = process.env.PORT || 8888;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
 
var Employee = require('./models/emp');
 
mongoose.connect(database.url);
app.get('/api/employees', function(req, res) {
	// use mongoose to get all todos in the database
	Employee.find(function(err, employees) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(employees); // return all employees in JSON format
	});
});
app.get('/api/employees/:employee_id', function(req, res) {
	let id = req.params.employee_id;
	Employee.findById(id, function(err, employee) {
		if (err)
			res.send(err)
 
		res.json(employee);
	});
 
});
app.post('/api/employees', function(req, res) {
	// create mongose method to create a new record into collection
	Employee.create({
		name : req.body.name,
		mobile : req.body.mobile,
		email : req.body.email,
        dob: req.body.dob
	}, function(err, employee) {
		if (err)
			res.send(err);
 
		// get and return all the employees after newly created employe record
		Employee.find(function(err, employees) {
			if (err)
				res.send(err)
			res.json(employees);
		});
	});
 
});
app.put('/api/employees/:employee_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.employee_id;
	var data = {
		name : req.body.name,
		mobile : req.body.mobile,
		email : req.body.email,
        dob:    req.body.dob
	}
 
	// save the user
	Employee.findByIdAndUpdate(id, data, function(err, employee) {
	if (err) throw err;
 
	res.send('Successfully! Employee updated - '+employee.name);
	});
});
app.delete('/api/employees/:employee_id', function(req, res) {
	console.log(req.params.employee_id);
	let id = req.params.employee_id;
	Employee.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Deleted.');	
	});
});
app.listen(port);
console.log("App listening on port : " + port);