/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const carService = require("../../../services/carService");

module.exports = {
  create(req, res) {
    carService
      .createCar(req)
      .then((car) => {
        res.status(201).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  list(req, res) {
    carService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { car: data },
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

  showDetail(req, res) {
    carService
    
      .get(req.params.id)
      .then((car) => {
        res.status(200).json({
          status: "OK",
          data: car,
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
    carService
      .updateCar(req.params.id, req)
      .then((car) => {
        res.status(201).json({
          status: "OK",
          data: car,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroy(req,res){
    try {
      const car = req.car; 
      const deletedBy = req.user.id; 
      await carService.deleteCar(car.id, deletedBy);
      res.status(200).json({
        status: "OK",
        message: "Success",
      });
    } catch (err) {
      res.status(err.statusCode).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async checkCar (req, res, next) {
    try {
      const id = req.params.id;
      const carPayload = await carService.get(id);
  
      if (!carPayload) {
        res.status(404).json({
          status: "FAIL",
          message: `car not found!`,
        });
        return;
      }
  
      req.car = carPayload;

      next();
    } catch (err) {
      res.status(500).json({
        status: "FAIL",
        message: "server error!",
      });
    }
  },

  // destroy(req, res) {
  //   carService
  //     .delete(req.params.id, req)
  //     .then((car) => {
  //       res.status(201).json({
  //         status: "Delete Success",
  //         data: car
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(422).json({
  //         status: "FAIL",
  //         message: err.message,
  //       });
  //     });
  // },
}

