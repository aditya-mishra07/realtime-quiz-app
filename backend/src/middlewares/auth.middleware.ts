import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const jwtToken = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(411).json({
        message: "JWT key not provided",
      });
    }
    const decoded = jwt.verify(jwtToken, secret);

    req.adminId = decoded;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "authentication error",
    });
  }
};

export { authMiddleware };
