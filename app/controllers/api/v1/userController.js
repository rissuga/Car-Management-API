/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const userService = require("../../../services/userService");

module.exports = {
  list(req, res) {
    userService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { users: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
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

  update(req, res) {
    userService
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
    userService
      .get(req.params.id)
      .then((user) => {
        res.status(200).json({
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

  destroy(req, res) {
    userService
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

  currentUser(req,res) {
    try {
      const user = req.user; //from authorization userMiddleware
      res.status(200).json({
        status: "OK",
        message: "Success",
        data: {
          name: user.name,
          email: user.email,
          userRole: user.userRole,
        },
      });
    } catch (err) {
      res.status(err.statusCode || 404).json({
        status: "FAIL",
        message: err.message,
      });
    }
  }
};
