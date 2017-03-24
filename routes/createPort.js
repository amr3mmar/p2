var express = require('express');
var router = express.Router();
var projectController = require('../controllers/projectController');
var portfolioController = require('../controllers/portfolioController');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer = require('multer');
let Portfolio = require('../models/portfolio');
let Project = require('../models/Project');

router.get('/',  function(req, res){

	/*if(Portfolio.find({ username: req.user.username})){
		  Project.find({ username: req.user.username }, function(err, projects){
            if (err)
                res.send(err.message)
            else{
                res.render('index', {userprojects: projects});
            }
        })
	}
	else{
		res.render('createPortfolio');
	}*/
	res.render('createPortfolio');

});


module.exports = router;