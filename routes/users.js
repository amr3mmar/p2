var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/'});
var NodeSession = require('node-session');
let Project = require('../models/Project');
var portfolioController = require('../controllers/portfolioController');
 
// init 
session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});


var User = require('../models/user');

router.get('/', function(req, res){
	res.render('login');
});

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/register', upload.any(), function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username1 = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var img = req.body.myimage;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	User.find({ username: username1 }, function(err, user1){
            if (err)
                res.send(err.message)
            else{
            	if(user1){
            		console.log('exists');
            	}
                
            }
        })

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username1,
			password: password
		});

		if(req.files)
        {
            req.files.forEach(function(file){
                newUser.profilepic = "public/uploads/"+file.filename;
            })
        }

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

/*router.post('/login',
  passport.authenticate('local', {successRedirect:'/profile', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
  	
    res.redirect('/profile');
  });*/

  router.post('/login',
  passport.authenticate('local', {successRedirect:'/x', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
  	
    res.redirect('/x');
  });

  router.post('/gotoprojects',  portfolioController.createPortfolio,function(req, res){
	res.redirect('/profile');
});
  router.post('/gotoprojects1', function(req, res){
	res.redirect('/profile');	 
});

router.post('/projs', function(req, res){
	 Project.find({ username: req.body.username }, function(err, projects){
            if (err)
                res.send(err.message)
            else{
                res.render('guestProjects', {userprojects: projects});
            }
        })

});

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;