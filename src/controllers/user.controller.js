import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { signUpSchema, logInSchema } from "../validations/user.validation.js";

const signUp = async (req, res) => {
  try {
    // parse body using zod
    const result = signUpSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    // check if user already exists
    const existing = await User.findOne({ email: result.data.email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // create new user
    const user = new User({
      name: result.data.name,
      email: result.data.email,
      password_hash: result.data.password,
    });
    await user.save();

    return res
      .status(201)
      .json({ token: generateToken(user.email), user: user.toJSON() });
  } catch (error) {
    return res.status(500).json({ error: `Signup failed: ${error}` });
  }
};

const logIn = async (req, res) => {
  try {
    // parse body using zod
    const result = logInSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    // check if user exists
    const user = await User.findOne({ email: result.data.email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // compare password
    const isMatch = await user.comparePassword(result.data.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Email or password is incorrect" });
    }

    return res
      .status(200)
      .json({ token: generateToken(user.email), type: "Bearer" });
  } catch (error) {
    return res.status(500).json({ error: `Login failed: ${error}` });
  }
};

const deleteUser = async (req, res) => {
  // Email from middleware
  const email = req.email;

  try {
    const user = await User.findOneAndDelete({ email });
    if (user) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to delete user: ${error.message}` });
  }
};

const verifyUser = async (req, res) => {
  return res.status(201);
};

export { deleteUser, logIn, signUp, verifyUser };
