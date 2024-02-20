const mongoose = require("mongoose")


const loginSchema = new mongoose.Schema({
    username : String,
    password : String,
});

const loginModel = mongoose.model('login',loginSchema);

module.exports = loginModel;