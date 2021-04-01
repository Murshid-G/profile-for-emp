var mongoose = require('mongoose');
var Schema = mongoose.Schema;
EmpSchema = new Schema({
    name : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },
    mobile :{
       type: Number,
       required: true,
       trim :true
    } ,         
	email: {
        type: String,
        trim:true,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    } ,
    dob:{
        type: Number,
        required:true,
        trim:true
    }
});
module.exports = mongoose.model('Employee', EmpSchema);