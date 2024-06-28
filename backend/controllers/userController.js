import UserModel from "../models/UserModel.js";
import generateHash from "../utils/generateHash.js";
import compareHash from "../utils/compareHash.js";
import generateToken from "../utils/generateToken.js";
import verifyToken from "../utils/verifyToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await generateHash(password);
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  } else {
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const accessToken = generateToken({ id: user._id, email: user.email });
    res.cookie("accessToken", accessToken);
    res.cookie("name", user.name);
    res.status(201).json({ message: "User registered successfully" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const isMatch = await compareHash(password, user.password);
      if (isMatch) {
        const accessToken = generateToken({
          id: user._id,
          email: user.email,
          name: user.name,
        });
        res.cookie("accessToken", accessToken);
        res.cookie("name", user.name);
        res.status(200).json({ message: "Logged in successfully" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.log("Error while Logging in", error);
  }
};

export const logout = (req, res) => {
  if (req.cookies.accessToken) {
    res.clearCookie("accessToken");
    res.clearCookie("name");
    res.send("Logged out successfully");
  } else {
    res.send("Not logged in");
  }
};

export const getUserProfile = async (req, res) => {
  try {
    let email = req.email;
    const user = await UserModel.findOne({ email });
    res.send(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
