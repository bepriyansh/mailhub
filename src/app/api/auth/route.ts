import { NextRequest, NextResponse } from "next/server";
import { tokenizer } from "@/utils/authUtils";
import { isValidEmail } from "@/utils/emailUtils";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const data = await request.json();
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }
  const token = tokenizer(data);
  console.log(token)
  const response = NextResponse.json({ message: "Login successful" });
  cookies().set("auth-token", token);
  cookies().set("email", data.email);
  return response;
}
