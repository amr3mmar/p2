var express = require('express');
var router = express.Router();
var projectController = require('../controllers/projectController');
var portfolioController = require('../controllers/portfolioController');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer = require('multer');

// var ItemSchema = mongoose.Schema(
//   { img: 
//       { data: Buffer, contentType: String },
//     username: String
//   }
// );
// var Item = mongoose.model('Clothes',ItemSchema);

var upload = multer({ dest: 'public/uploads/'});



// Get Homepage
/*router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});*/

// add routes
router.get('/', projectController.getUserProjects, function(req, res){
	res.render('index');
});


router.post('/guest', portfolioController.getAllPortfolios);

router.post('/project', upload.any(), projectController.createProject);

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;