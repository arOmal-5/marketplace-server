const User  = require("../models/userModel");
const bcryptjs = require('bcryptjs')

const signUpController = async (req, res,  next) => {

  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10)
    const user = new User({
     username,
      email,
      password : hashedPassword
    });

    const savedUser = await user.save();
    res.send({ message: "User created successfully", user: savedUser });
  } catch (err) {
    next(err)
  }
};

const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (isValidPassword) {
      res.status(200).send({ message: "User signed in successfully" });
    } else {
      res.status(401).send({ message: "Invalid password" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signUpController, signinController };