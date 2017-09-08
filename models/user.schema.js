
var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    emp_id: { type:String, required:true },
    team_details: { type:Array, required:true },
    first_name: { type:String, required:true },
    last_name: { type:String, required:true },
    role: { type:String, required:true },
    designation: { type:String, required:true },
    profile_image: { type:String, required:true },
    description: { type:String, required:true },
    reporting_manager: { type:Object, required:true },
    projects_worked: { type:Array, required:true },
    key_skills: { type: Object, required:true },
    skype: { type:String, required:true },
    slack: { type:String, required:true },
    phone: { type: Number, required:true },
    email: { type:String, required:true },
    password: {type: String, required: true, default:"Password123"}
});

var Employee = mongoose.model('Employees', employeeSchema); // this is employees model

module.exports = Employee;
