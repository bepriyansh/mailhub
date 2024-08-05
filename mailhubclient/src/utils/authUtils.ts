import jwt, { JwtPayload } from "jsonwebtoken";

interface decodedToken extends JwtPayload {
  email: string;
  password: string;
}

export const tokenizer = (data: {
  email: string;
  password: string;
}): string => {
  const token = jwt.sign(data, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
  return token;
};

export const detokenizer = (token: string): decodedToken => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    if (typeof decoded === "object" && "email" in decoded && "password" in decoded) {
      return decoded as decodedToken;
    } else {
      throw new Error("Invalid token structure");
    }
  } catch (error) {
    throw new Error("Invalid token");
  }
};
