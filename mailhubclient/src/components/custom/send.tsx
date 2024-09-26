'use client'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getAuthToken } from "./login";

export function Send() {
  const emailState = useSelector((state: RootState) => state.email);

  const sendMail = async () => {
    let [tok, mail] = getAuthToken();
    const mailData = {
      recipients: emailState.recipients,
      subject: emailState.subject,
      text: emailState.text,
      token: tok,
    };

    try {
      fetch("/api/sendmails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailData),
      })
        .then((res) => res.json())
        .then((data) =>
          toast(data.message, {
            action: {
              label: "Close",
              onClick: () => { },
            },
          })
        )
    } catch (error) {
      toast("Error", {
        description: "Error while sending mails",
        action: {
          label: "Close",
          onClick: () => { },
        },
      })
    }
  }
  return (
    <Button
      onClick={() => sendMail()}
    >
      Send
    </Button>
  )
}
