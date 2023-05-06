const carRepository = require("../repositories/carRepository");

module.exports = {
  create(requestBody) {
    return carRepository.create(requestBody);
  },

  update(id, requestBody) {
    return carRepository.update(id, requestBody);
  },

  delete(id) {
    return carRepository.delete(id);
  },

  async list() {
    try {
      const cars = await postRepository.findAll();
      const carCount = await postRepository.getTotalPost();

      return {
        data: cars,
        count: carCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return carRepository.find(id);
  },
};
