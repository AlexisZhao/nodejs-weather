var express = require('express');
var router = express.Router();

//MongoDB Collection cities
var City = require('../models/city');

//Get City page 
router.get('/city', ensureAuthenticated, function(req, res){
	res.render('city');
})

//Add city
router.post('/city', function(req,res){
	var cityName = req.body.cityName;
	// var country = req.body.country;

	// Validation
	req.checkBody('cityName', 'City name and country code is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		// console.log('errors');
		res.render('city',{
			errors:errors
		});
	} else {
		console.log('no errors');

		var newCity = new City({
			cityName: cityName
			// country: country
		});

		City.createCity(newCity, function(err, city){
			if(err) throw err;
			console.log(city);
		});

		req.flash('success_msg', 'City successully added.');

		res.redirect('/');
	}
})

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;