const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { firstName, lastName, email, password } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser !== null) {
        resolve({
          status: "OK",
          message: "The email is already used",
        });
        return;
      }

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
      });

      if (createdUser) {
        sendEmailCreateUser(email);

        resolve({
          status: "OK",
          message: "User created successfully",
          data: createdUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const comparedPassword = bcrypt.compareSync(password, checkUser.password);
      if (checkUser)
        if (!comparedPassword) {
          resolve({
            status: "ERR",
            message: "The password is  incorrect",
          });
        }
      const access_token = await generalAccessToken({
        id: checkUser.id,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};


const refreshToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
      const access_token = await generalAccessToken({
        id: decoded.id,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
      });
    } catch (error) {
      reject({
        status: "ERR",
        message: error.message,
      });
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  refreshToken,
};
