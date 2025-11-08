import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const createToken = (id, email) => {
  return jwt.sign({ id, email }, SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};