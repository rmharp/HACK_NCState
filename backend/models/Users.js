const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: String, 
    description: String
})

const UserModel = mongoose.model("ratdata", UserSchema)
module.exports = UserModel;
