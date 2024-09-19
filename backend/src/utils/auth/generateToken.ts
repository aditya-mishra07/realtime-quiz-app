import NotFoundError from "../errors/NotFoundError";
import jwt from "jsonwebtoken";

function generateAccessToken(userId: number) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new NotFoundError({ message: "env file not found!" });
  }
  return jwt.sign({ userId }, secret);
}

function generateRefreshToken(userId: number) {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new NotFoundError({ message: "env file not found!" });
  }
  return jwt.sign({ userId }, secret);
}
export { generateAccessToken, generateRefreshToken };
