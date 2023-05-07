'use strict';

const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  try{
    const encryptedPassword = await bcrypt.hash(password,10);
    return encryptedPassword;
  }catch(err){
    return err;
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const encryptedPassword = await encryptPassword('superadmin123');

    return queryInterface.bulkInsert('Users', [{
      name: 'risa super admin',
      email: 'superadmin@gmail.com',
      encryptedPassword:  encryptedPassword,
      userRole: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {userRole:'superadmin'}, {});
  }
};
