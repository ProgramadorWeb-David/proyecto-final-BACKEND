var express = require('express');
var router = express.Router();
const cloudinary = require('cloudinary');


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });


// VER
// CLOUDINARY_URL=cloudinary://421842281394231:rumRB4-EqtyYv1zYLqDOEmQlfbI@dx5npv2gc

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/login');
});

module.exports = router;
