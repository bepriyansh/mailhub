import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const response = NextResponse.json({ message: "Login successful" });
  return response;
}
