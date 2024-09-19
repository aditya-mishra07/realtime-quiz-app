import zod from "zod";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
  createAdminModel,
  findExistingAdminModel,
  verifyAdminModel,
} from "../models/auth.model";
import BadRequestError from "../utils/errors/BadRequestError";
import ConflictError from "../utils/errors/ConflictError";
import NotFoundError from "../utils/errors/NotFoundError";
import {
  comparePassword,
  hashPassword,
} from "../utils/auth/passwordEncryption";
import InternalServerError from "../utils/errors/InternalServerError";
import UnauthorizedError from "../utils/errors/UnauthorizedError";
import { asyncHandler } from "../utils/errors/asyncHandler";

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    throw new BadRequestError({
      code: 400,
      message: "All fields are required!",
    });
  }

  const hashedPassword = await hashPassword(req.body.password);

  const existingAdmin = await findExistingAdminModel(req.body.email);

  if (existingAdmin) {
    throw new ConflictError({
      code: 409,
      message: "User with email already exists",
    });
  }
  const { id } = await createAdminModel({
    email: req.body.email,
    password: hashedPassword,
  });

  if (!id) {
    throw new InternalServerError({
      message: "Something went wrong creating user!",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new NotFoundError({ message: "env file not found!" });
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
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signin = asyncHandler(async (req: Request, res: Response) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    throw new BadRequestError({
      code: 400,
      message: "Email and password is required!",
    });
  }
  const admin = await findExistingAdminModel(req.body.email);
  if (!admin) {
    throw new NotFoundError({ message: "User does not exist!" });
  }
  const { id, password } = admin;
  const isPasswordValid = await comparePassword(req.body.password, password);
  if (!isPasswordValid) {
    throw new UnauthorizedError({ message: "Invalid user credentials" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new NotFoundError({ message: "env file not found!" });
  }

  const token = jwt.sign({ id }, secret);
  return res.json({
    token: token,
    message: "Signed in!",
  });
});

export { signup, signin };
