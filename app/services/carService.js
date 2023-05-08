const carRepository = require("../repositories/carRepository");
const {cloudinary} = require("../../utils/cloudinary");


module.exports = {
  async createCar(request) {
      const result = await cloudinary.uploader.upload(request.file.path);
      const {name, price, size, image, available} = request.body
      const {id} = request.user;

      if (!name || !price || !size || !available || !{image:result.url}){
        return{
          data: null,
          message: "Complete your input!",
          status: "Failed"
        }
      }

      if (!["small", "medium", "large"].includes(size.toLowerCase())){
        return{
          data: null,
          message: "size format must be small, medium, or large",
          status: "Failed"
        }
      }

      if (!["yes", "no"].includes(available.toLowerCase())){
        return{
          data: null,
          message: "Available format must be Yes or No",
          status: "Failed"
        }
      }
      
      newCar = await carRepository.create({name, price, size, image: result.url, available, createdBy: id});
      if(name || price || size || available || image){
        return{
          data: newCar,
        }
      }

  },

  async updateCar(idCar, request) {

    const result = await cloudinary.uploader.upload(request.file.path);
    const {name, price, size, image, available} = request.body;
    const {id} = request.user;

    if (!name || !price || !size || !available || !{image: result.url}){
      return{
        data: null,
        message: "Complete your input!",
        status: "Failed"
      }
    }

    if (!["small", "medium", "large"].includes(size.toLowerCase())){
      return{
        data: null,
        message: "size format must be small, medium, or large",
        status: "Failed"
      }
    }

    if (!["yes", "no"].includes(available.toLowerCase())){
      return{
        data: null,
        message: "Available format must be Yes or No",
        status: "Failed"
      }
    }

    return carRepository.update(idCar, {name, price, size, image: result.url, available, updatedBy: id});
    if(name || price || size || available || image){
      return{
        data: updatedCar,
        status: "Success"
      }
    }
   
  },


  async deleteCar (carId, deletedBy) {
    try {
      await carRepository.updateCar(carId, { deletedBy });
      return await carRepository.delete(carId);
    } catch (error) {
      return{
        message: ( "failed delete car!")
      }
    }
  },

  async list() {
    try {
      const payload = await carRepository.findAll();
      const carCount = await carRepository.getTotalPost();

      const carPayload =
      (await payload.length) < 1
        ? []
        : payload.map((car) => {
            return {
              id: car?.dataValues?.id,
              name: car?.dataValues?.name,
              price: car?.dataValues?.price,
              size: car?.dataValues?.size,
              image: car?.dataValues?.image,
              available: car?.dataValues?.available,
              createdAt: car?.dataValues?.createdAt,
              updatedAt: car?.dataValues?.updatedAt,
            };
          });

      return {
        data:carPayload,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },


  async getCarById(id) {
    try {
      const payload = await carRepository.find(id);
     
      const carPayload = {
          id: payload?.id,
          name: payload?.name,
          price: payload?.price,
          size: payload?.size,
          image: payload?.image,
          available: payload?.available,
          createdAt: payload?.createdAt,
          updatedAt: payload?.updatedAt,
        }
        return carPayload;
      
    } catch (err) {
      throw err;
    }
  },

  async getDetailAllCar() {
    try {
      const payload = await carRepository.findAll();
      const carCount = await carRepository.getTotalPost();

      const carPayload =
      (await payload.length) < 1
        ? []
        : payload.map((car) => {
            return {
              id: car?.dataValues?.id,
              name: car?.dataValues?.name,
              price: car?.dataValues?.price,
              size: car?.dataValues?.size,
              image: car?.dataValues?.image,
              available: car?.dataValues?.available,
              createdBy: car?.dataValues.createdBy,
              updatedBy: car?.dataValues?.updatedBy,
              deletedBy: car?.dataValues?.deletedBy,
              createdAt: car?.dataValues?.createdAt,
              updatedAt: car?.dataValues?.updatedAt,
            };
          });

      return {
        data:carPayload,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async get(id) {
      return carRepository.find(id);
  },

  async delete(carId, request) {
    try{
      const {id} = request.user;

      if(!carId){
        return{
          status :"Fail",
          message: "Car not found"
        }
      }

      carRepository.delete(carId,{deletedBy: id});

    }catch(err){
      return err;

    }
    
  },

 


}
