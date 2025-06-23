import dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const createToken = (req: Request, res: Response): void => {
  const apiUser = { id: 1, username: "learnUser", role: "admin" };

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: "JWT_SECRET is not defined in the environment variables" });
    return;
  }

  const token = jwt.sign(apiUser, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json({ message: "Token Successfully created", token });
};

interface AuthenticatedRequest extends Request {
  apiUser?: any;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token required" });
  }

  const token = authHeader.split(" ")[1];
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is not defined in the environment variables" });
  }

  try {
    req.apiUser = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};
