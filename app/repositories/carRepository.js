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

  delete(id) {
    return Car.destroy(id);
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
};
