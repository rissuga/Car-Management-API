const carRepository = require("../repositories/carRepository");

const notNullCar = async (request) => {
  try{
    const {name, price, size, image, available} = request.body

    if (!name || !price || !size || !available || !image)
    throw new ApplicationError(400, "please complete all input!");
    
    
  }catch(err){
    return err;
  }
}



module.exports = {
  async createCar(request) {
    
      const {name, price, size, image, available} = request.body
      const {id} = request.user;

      if (!name || !price || !size || !available || !image){
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
      

      newCar = await carRepository.create({name, price, size, image, available, createdBy: id});
      if(name || price || size || available || image){
        return{
          data: newCar,
          status: "Success"
        }
      }

  },

  async updateCar(idCar, request) {
    
    const {name, price, size, image, available} = request.body;
    const {id} = request.user;

    if (!name || !price || !size || !available || !image){
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

    updatedCar = await carRepository.update(idCar, {name, price, size, image, available, updatedBy: id});
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
      const cars = await carRepository.findAll();
      const carCount = await carRepository.getTotalPost();

      return {
        data: cars,
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
