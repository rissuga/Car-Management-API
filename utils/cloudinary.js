// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// cloudinary.config({
//   cloud_name: "dlecslvis", // TODO: Ganti dengan cloudname-mu
//   api_key: "899174363718552", // TODO: Ganti dengan API Key-mu
//   api_secret: "PZKOVpo5aBpFKoH6_EqZBuwz19s", // TODO: Ganti dengan API Secret-mu
//   secure: true,
// });

//Get from Cloudinary Dashboard
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: process.env.CLOUDINARY_SECURE,
});

module.exports = {
  cloudinary
};