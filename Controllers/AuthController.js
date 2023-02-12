import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  const newUser = new UserModel(req.body);

  const { username } = req.body;
  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      res.status(400).json("Username is already registered");
    } else {
      const user = await newUser.save();
      const token = jwt.sign(
        {
          username: user.username,
          _id: user.id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
      );
      res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const validate = await bcrypt.compare(password, user.password);

      if (validate) {
        const token = jwt.sign(
          {
            username: user.username,
            _id: user.id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1d" }
        );
        res.status(200).json({ user, token });
      } else {
        res.status(400).json("Wrong Password");
      }
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
