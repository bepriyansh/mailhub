'use client'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function Send() {
  return (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Send
    </Button>
  )
}
