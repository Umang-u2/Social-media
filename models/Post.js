const mongoose = require("mongoose");

//Creating Post schema in mongoDB
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        max: 100
    },
    desc: {
        type:String,
        max: 500
    },
    img: {
        type: String,
    },
},

{ timestamp: true}
);

module.exports = mongoose.model("Post", PostSchema);