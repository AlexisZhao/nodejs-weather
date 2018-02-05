var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// City Schema
var CitySchema = mongoose.Schema({
	cityName: {
		type: String,
		index:true
	}
	// country: {
	// 	type: String
	// }
});

//MongoDB Collection
var City = module.exports = mongoose.model('City', CitySchema);

module.exports.createCity = function(newCity, callback){
	        newCity.save(callback);
	  

}
