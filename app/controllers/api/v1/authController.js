/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const userService = require("../../../services/userService");
const jwt = require("jsonwebtoken");

module.exports = {

  register(req, res) {
    userService
      .create(req.body)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  login(req, res) {
    userService
      .login(req.body)
      .then((user) => {
        if(!user.data){
          res.status(401).json({
            status: "FAIL",
            message : user.message,
            data: null,
          });
          return;
        }
        res.status(201).json({
          status: "OK",
          data: {
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            token: user.data.token
          }
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    postService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    postService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    postService
      .delete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  // middleware 
  authorize(req,res,next) {
    try{
    // meendapatkan token 
    const bearerToken = req.headers.authorization; 
    const token = bearerToken.split("Bearer ")[1];

    const tokenPayload = jwt.verify(token,'secret');

    req.user = tokenPayload;

    next();
    }catch(err){
      console.log(err);
      res.status(401).json({
        message: "Unauthorize",
      });
      
    }

  }
};
