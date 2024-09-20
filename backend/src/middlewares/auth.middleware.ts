import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../utils/errors/UnauthorizedError";
import NotFoundError from "../utils/errors/NotFoundError";
import { findAdminByIdModel } from "../models/auth.model";
import { asyncHandler } from "../utils/errors/asyncHandler";
dotenv.config();

interface JwtPayload {
  userId: number;
}
const authMiddleware = asyncHandler(async (req: any, res: any, next: any) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new UnauthorizedError({ message: "Unauthorized access" });
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new NotFoundError({ message: "env file not found!" });
    }
    const decoded = jwt.verify(accessToken, secret);

    if (typeof decoded === "string") {
      throw new UnauthorizedError({ message: "Invalid access token" });
    }
    const { userId } = decoded as JwtPayload;

    const admin = await findAdminByIdModel(userId);
    if (!admin) {
      throw new UnauthorizedError({ message: "Invalid access token" });
    }

    req.adminId = admin.id;
    next();
  } catch (err) {
    throw new UnauthorizedError({ message: "Invalid access token" });
  }
});

export { authMiddleware };

// const authHeader = req.headers.authorization;

// if (!authHeader || !authHeader.startsWith("Bearer ")) {
//   return res.status(403).json({});
// }

// const jwtToken = authHeader.split(" ")[1];
