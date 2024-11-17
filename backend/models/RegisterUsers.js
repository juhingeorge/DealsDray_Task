let mongoose = require("mongoose")
let schema1 = new mongoose.Schema({
    name:String,
    email: String,
    cnfPassword: String,
   
})

let RegisterUsers = mongoose.model("registeredUsers", schema1)

module.exports = RegisterUsers;