/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const userController = require("./userController");
const authController = require("./authController");
const carController = require("./carController");

module.exports = {
  userController,
  authController,
  carController
};
