import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export const tokenizer = (data: {
  email: string;
  password: string;
}): string => {
  const token = jwt.sign(data, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
  return token;
};

export const serializer = (token: string) => {
  const serializedCookie = serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return serializedCookie;
};

export const detokenizer = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
