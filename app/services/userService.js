const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const encryptPassword = async (password) => {
  try{
    const encryptedPassword = await bcrypt.hash(password,10);
    return encryptedPassword;
  }catch(err){
    return err;
  }
}

const comparePassword = async (password, encryptedPassword) =>{
  try{
    const result = await bcrypt.compare(password,encryptedPassword);
    return result;
  }catch(err){
    return err;
  }
}

const createToken = (payload) => {
  return jwt.sign(payload,"secret");
}

module.exports = {
  async create(requestBody) {
    const {name, email} = requestBody;
    const encryptedPassword = await encryptPassword(requestBody.encryptedPassword);

    const userEmail = await userRepository.finsUserByEmail(email);

    if(userEmail){
      return{
        data: null,
        message: "Email has been taken !!!",
        status: "Failed"
      };
    }

    newUser = await userRepository.create({ name, email, encryptedPassword });
    if(!userEmail){
      return{
        data: newUser,
        status: "Success"
      }
    }

  },

  async login(requestBody){
    const {email,password} = requestBody;

    const user = await userRepository.finsUserByEmail(email);

    if(!user){
      return{
        isValid : false,
        message : "Email not found",
        data : null
      }
    }


    const isPasswordCorrect = await comparePassword(password, user.encryptedPassword)

    if(!isPasswordCorrect){
      return{
        isValid : false,
        message : "Password not corret",
        data : null
      }
    }

    const token = createToken({
      id: user.id, 
      email: user.email,
      name: user.name
    })

    user.token = token;

    if(isPasswordCorrect){
      return{
        isValid : true,
        message : '',
        data : user
      }
    }

  },

  update(id, requestBody) {
    return userRepository.update(id, requestBody);
  },

  delete(id) {
    return userRepository.delete(id);
  },

  async list() {
    try {
      const users = await userRepository.findAll();
      const userCount = await userRepository.getTotalPost();

      return {
        data: users,
        count: userCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return userRepository.find(id);
  },
};
