import zod from "zod";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  createAdminModel,
  findExistingAdminModel,
  verifyAdminModel,
} from "../models/auth.model";

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signup = async (req: Request, res: Response) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingAdmin = await findExistingAdminModel(req.body.email);

  if (existingAdmin) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  const { id } = await createAdminModel(req.body);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(411).json({
      message: "JWT key not provided",
    });
  }

  const token = jwt.sign(
    {
      id,
    },
    secret,
    { expiresIn: "1h" }
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
};

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signin = async (req: Request, res: Response) => {
  console.log(req.body);
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }
  const admin = await verifyAdminModel(req.body);
  const id = admin?.id;

  if (admin) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(411).json({
        message: "JWT key not provided",
      });
    }

    const token = jwt.sign({ id }, secret);
    return res.json({
      token: token,
      message: "Signed in!",
    });
  }

  return res.status(401).json({
    message: "Email or the Password do not match!",
  });
};

export { signup, signin };
