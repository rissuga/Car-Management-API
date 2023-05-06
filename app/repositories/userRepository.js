const { User } = require("../models");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return User.destroy(id);
  },

  find(id) {
    return User.findByPk(id);
  },

  findAll() {
    return User.findAll();
  },

  getTotalPost() {
    return User.count();
  },

  finsUserByEmail(email) {
    return User.findOne({
      where : {email}
    })
  }
};
