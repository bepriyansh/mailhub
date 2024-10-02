import { detokenizer } from "@/utils/authUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const decodedToken = detokenizer(data.token);

  const mailData = {
    recipients: data.recipients,
    subject: data.subject,
    text: data.text,
    mailId: decodedToken.email,
    mailPassword: decodedToken.password,
  };
  try {
    console.log(`${process.env.MAILHUB_SERVER as string}/api/v1/mail`)
    const response = await fetch(`${process.env.MAILHUB_SERVER as string}/api/v1/mail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY as string}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailData),
    })
    if (!response.ok) {
      throw new Error(`Failed to send mail: ${response.statusText}`);
    }

    const responseData = await response.json();
    return NextResponse.json({ message: "Mail sent successfully", data: responseData });
  } catch (error) { 
    console.error("Error during mail send:", error); // More detailed error logging
    return NextResponse.json({ error: `Failed to send mail: ${error}` }, { status: 500 });
  }
}