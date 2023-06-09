const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SIGNATURE_KEY} = process.env;


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
  return jwt.sign(payload,JWT_SIGNATURE_KEY);
}

module.exports = {
  async createAdmin(requestBody) {
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

    newUser = await userRepository.create({ name, email, encryptedPassword, userRole: 'admin' });
    if(!userEmail){
      return{
        data: newUser,
      }
    }

  },

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

    newUser = await userRepository.create({ name, email, encryptedPassword, userRole: 'member' });
    if(!userEmail){
      return{
        data: newUser,
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
      name: user.name,
      userRole: user.userRole
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
      const payload = await userRepository.findAll();
      const userCount = await userRepository.getTotalPost();

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
        data: carPayload,
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
