import dotenv from "dotenv";
import zod from "zod";
import jwt from "jsonwebtoken";
import { createAdminModel, findExistingAdminModel } from "../models/auth.model";

dotenv.config();

const signupBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signup = async (req: any, res: any) => {
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

export { signup };
