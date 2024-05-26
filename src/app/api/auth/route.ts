import { NextRequest, NextResponse } from "next/server";
import { serializer, tokenizer } from "@/utils/authUtils";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const token = tokenizer(data);
  const serializedCookie = serializer(token);
  const response = NextResponse.json({ message: "Login successful" });
  response.headers.set("Set-Cookie", serializedCookie);
  return response;
}
