const { Car } = require("../models");

module.exports = {
  create(createArgs) {
    return Car.create(createArgs);
  },

  update(id, updateArgs) {
    return Car.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(carId) {
    return Car.destroy({ 
      where: { 
        id: carId 
      }
    });
  },

  find(id) {
    return Car.findByPk(id);
  },

  findAll() {
    return Car.findAll();
  },

  getTotalPost() {
  return Car.count();
  },

  updateCar(carId, updateArgs){
    return Car.update(updateArgs, { where: { id: carId } });
  },
  deleteCar(carId, updateArgs){
    return Car.delete(updateArgs, { where: { id: carId } });
  },

  
};
