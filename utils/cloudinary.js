// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlecslvis", // TODO: Ganti dengan cloudname-mu
  api_key: "899174363718552", // TODO: Ganti dengan API Key-mu
  api_secret: "PZKOVpo5aBpFKoH6_EqZBuwz19s", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

module.exports = {
  cloudinary
};