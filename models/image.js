var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    username:String
})

var Image = mongoose.model("image", imageSchema);

module.exports = Image;