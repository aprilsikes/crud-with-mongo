var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants_development');

// var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  name: String,
  location: String,
  created_at: Date,
  updated_at: Date
});

var Restaurant = mongoose.model('Restaurant', schema);

router.get('/', function(req, res, next) {
	Restaurant.find().then(function(restaurants) {
			res.render('restaurants/restIndex', {restaurants: restaurants});
	});
});

router.get('/new', function(req, res, next){
	res.render('restaurants/restNew')
});

router.post('/', function (req, res, next) {
  restaurant = new Restaurant({
    name: req.body.name,
    location: req.body.location
  });

  restaurant.save(function () {
    res.redirect(301, '/restaurants');
  });

});

module.exports = router;
