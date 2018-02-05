var express = require('express');
var router = express.Router();

var cityname;
var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&appid=82d3cbb2aa628a87d5f513473f4ddfea';
var tempCity = "";

const http = require('http');
const https = require('https');

// //MongoDB Collection cities
var City = require('../models/city');

//City, ensure can be seen after logged in
router.get('/weather', ensureAuthenticated, function(req, res){
// router.get('/weather', function(req, res){
	res.render('weather');
})

//Add city
router.post('/weather', function(req,res){
	var cityName = req.body.cityName;
	// var country = req.body.country;
	tempCity = cityName;
	// Validation
	req.checkBody('cityName', 'City name is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log('errors');
		res.render('weather',{
			errors:errors
		});
	} else {
		console.log('no errors');

		var newCity = new City({
			cityName: cityName
			// country:country
		});

		City.createCity(newCity, function(err, city){
			if(err) throw err;
			console.log(city);
			console.log(city.cityName);
			cityname = city.cityName;


// 			//request http
// https.get(url, (resp) => {
//   let data = '';
//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//  // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

			var testTemp = '23'
			res.render('weather', {city1:city.cityName, temp: testTemp});
		});
		
		
		// req.flash('success_msg', 'City successully added.');

		// res.redirect('/cities/weather');

	}
})

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('weather');
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