const mongoose = require("mongoose");

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