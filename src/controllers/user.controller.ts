import { Request, Response } from "express";
import User from "../models/user.model";
import { signToken } from "../utils/signToken";

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = await User.create({ email, password });

  const { password: userPassword, ...savedUser } = newUser.toObject();

  res.status(201).json(savedUser);
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({
          status: "unsuccessful",
          message: "Please provide email and password",
        });
    }
    const user = await User.findOne({ email });
    if (!user) return res
    .status(400)
    .json({
      status: "unsuccessful",
      message: "Invalid credentials",
    });

    if (user && (await user.comparePassword(password))) {
      const token = signToken(user._id.toString(), user.email);
      res.status(200).json({
        status: "successful",
        token,
      });
    }
  } catch (e: any) {
    console.log("User Error", e.message);
  }
};

const getMe = (req: Request, res: Response) => {
    const user = req.user;
    res.status(200).json({
      user
    })
}

export { registerUser, loginUser, getMe };
