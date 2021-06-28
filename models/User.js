const mongoose = require("mongoose");

//Creating User Schema in MongoDB
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 25,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 40,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePic: {
        type: {
            data: Buffer,
            contentType: String,
          }
    }
});

module.exports = mongoose.model("User", UserSchema);