import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { z } from "zod";

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.number(),
  }),
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await CreateUserZodSchema.parseAsync(req.body);

    // static method approch
    // const password = await User.hashPassword(body.password);
    // body.password = password;

    const user = await User.create(body);

    // instance method approch
    // const user = new User(body);
    // const password = await user.hashPassword(body.password);
    // user.password = password;
    // await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "Get Users",
    users,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "Get Single User",
    user,
  });
});

userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;

  const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "User Updated Successfully",
    user,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findOneAndDelete({ _id: userId });

  res.status(201).json({
    success: true,
    message: "User Deleted Successfully",
    user,
  });
});
