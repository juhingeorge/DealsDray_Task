let mongoose = require("mongoose")
let schema1 = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    designation: String,
    gender: String,
    image: String,
    course: {
        type: Array,
        default: []
    },
    createdDate: {
        type: Date,
        default: Date.now // Automatically sets the current date and time
    }
});

let EmployeeRegister = mongoose.model("EmployeeRegister", schema1);

module.exports = EmployeeRegister;
