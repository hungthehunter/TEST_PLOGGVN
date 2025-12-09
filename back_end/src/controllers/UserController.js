const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");
const createUser = async (req, res) => {
  try {
    const { firstName, lastName , email, password, confirmPassword} = req.body;
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return res
        .status(200)
        .json({ status: "ERR", message: "Please fill in all fields" });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Email is invalid",
      });
    } else if (password !== confirmPassword) {
      return res.status.json({
        status: "ERR",
        message: "Password and Confirm Password are not the same",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "ERR", message: "Please fill in all fields" });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Email is invalid",
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
    return res.status(200).json({ ...newResponse, refresh_token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshJWTServiceToken(token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  refreshToken,
};
