const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = 'mongodb+srv://ratkings-admin1:AC6LSM7R32WGta2z@cluster0.iel1nd7.mongodb.net/'

const UserSchema = mongoose.Schema({
    id: String,
    description: String
})

const UserModel = mongoose.model("users", UserSchema)

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }  catch (error) {
        console.error(error);
    }
}

connect();

app.listen(3000, () => {
    console.log("Server started on port 3000");
})