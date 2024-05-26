import jwt from "jsonwebtoken";

export const tokenizer = (data: {
  email: string;
  password: string;
}): string => {
  const token = jwt.sign(data, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
  return token;
};

export const detokenizer = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
