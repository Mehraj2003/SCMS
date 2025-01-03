import User from "../models/userModel.js";
import { USER_ROLES } from "../utils/constants.js";
import { generateToken, comparePass } from "../utils/auth.js";

const registerUser = async (req, res) => {
  try {
    const data = { ...req.body };
    data.createdAt = new Date();
    data.role = USER_ROLES[data?.role ? data?.role : 3];
    const newUser = new User(data);
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error Encountered!" });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }
    const validPassword = await comparePass(data.password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });
    } else {
      const token = await generateToken(user);
      let usr = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return res.status(200).json({
        success: true,
        message: "Login Successful!",
        user: usr,
      });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: "Error Encountered!" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }
    const token = await generateToken(user);
    let usr = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      user: usr,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error Encountered!" });
  }
};

export { registerUser, login };