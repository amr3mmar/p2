var mongoose = require('mongoose');

var portfolioSchema = mongoose.Schema({
    title:{
        type:String,
        required:true, 
        unique:true
    },
    username:String,
    summary:String
})

var Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;