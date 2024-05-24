import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Send } from "./send";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";

const MailForm = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-2">
      <Textarea
        placeholder="Write your mail here..."
        rows={28}
        className="resize-none"
      />
      <div className="flex w-full px-2 justify-start items-center gap-8">
        <Send />
        <div className="flex justify-start items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            id="attachments"
            className="rounded-full size-8 text-gray-500"
          >
            <Plus />
          </Button>
          <Label
            htmlFor="attachments"
            className="text-gray-500 font-light text-xs hover:text-gray-700 hover:dark:text-gray-300 delay-75"
          >
            Add attachments
          </Label>
        </div>
      </div>
    </div>
  );
};

export default MailForm;
