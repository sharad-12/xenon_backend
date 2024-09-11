const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title:String,
  price: String,
  propertytype:String,
  address: String,
  type: String,
  bedrooms: Number,
  bathrooms: Number,
  phoneNumber: String,
  imageURLs: String,
  description: String,
});

// Export the model
const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
