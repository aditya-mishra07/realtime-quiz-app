import zod from "zod";
import { CookieOptions, Request, Response } from "express";
import {
  addRefreshTokenModel,
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
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth/generateToken";

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

  res.status(200).json({
    message: "User created successfully",
  });
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const options: CookieOptions = {
  httpOnly: true,
  secure: true,
};

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

  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);
  const hashedToken = await hashPassword(refreshToken);
  if (!refreshToken) {
    throw new NotFoundError({ message: "Access/Refresh Token not found" });
  }
  const updatedAdmin = await addRefreshTokenModel(id, hashedToken);
  console.log(updatedAdmin);

  return res
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({
      token: accessToken,
      message: "Signed in!",
    });
});

const signout = asyncHandler(async (req, res) => {});

export { signup, signin };
