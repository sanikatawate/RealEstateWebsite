const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, require : true},
    email: {type:String,require: true},
    password: {type:String,require: true}
})

const User = mongoose.model("user", UserSchema);

module.exports =  User;