const  Property = require('../models/listing.model');
const { errorHandler } = require("../utils/error");

exports.createListing = async (req, res) => {
  try {
    const { title,price, address, type, bedrooms, bathrooms,propertytype, phoneNumber, imageURLs, description } = req.body;

    // Create new property instance
    const listing = new Property({
      title,
      price,
      address,
      type,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      phoneNumber,
      propertytype,
      imageURLs,
      description,
    });

    // Save to database
    await listing.save();

    // Return the created listing
    return res.status(200).json({
      listing,
      success:true
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    next(error);
  }
};



// exports.deleteListing = async (req,res,next) =>{
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//       return next(errorHandler(404, 'Listing not found!'));
//     }
  
//     if (req.user.id !== listing.userRef.toString()) {
//       return next(errorHandler(401, 'You can only delete your own listings!'));
//     }
  
//     try {
//       await Listing.findByIdAndDelete(req.params.id);
//       res.status(200).json('Listing has been deleted!');
//     } catch (error) {
//       next(error);
//     }
// }

// exports.updateListing = async (req,res,next) =>{
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     return next(errorHandler(404, 'Listing not found!'));
//   }
//   if (req.user.id !== listing.userRef) {
//     return next(errorHandler(401, 'You can only update your own listings!'));
//   }

//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getListing = async (req,res,next)=>{
//   try {
//     const listing = await Listing.findById(req.params.id);
//     // console.log(listing)
//     if (!listing) {
//       return next(errorHandler(404, 'Listing not found!'));
//     }
//     res.status(200).json(listing);
//   } catch (error) {
//     next(error);
//   }
// }

// exports.getAllListings = async (req,res,next) =>{
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     let offer = req.query.offer;

//     if (offer === undefined || offer === 'false') {
//       offer = { $in: [false, true] };
//     }

//     let furnished = req.query.furnished;

//     if (furnished === undefined || furnished === 'false') {
//       furnished = { $in: [false, true] };
//     }

//     let parking = req.query.parking;

//     if (parking === undefined || parking === 'false') {
//       parking = { $in: [false, true] };
//     }

//     let type = req.query.type;

//     if (type === undefined || type === 'all') {
//       type = { $in: ['sale', 'rent'] };
//     }

//     const searchTerm = req.query.searchTerm || '';

//     const sort = req.query.sort || 'createdAt';

//     const order = req.query.order || 'desc';

//     const listings = await Listing.find({
//       name: { $regex: searchTerm, $options: 'i' },
//       offer,
//       furnished,
//       parking,
//       type,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     return res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// }

exports.getAllListings = async (req,res,next) =>{
  try {
      const listings = await Property.find();
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}