"use client";
import React, { useState, ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Send } from "./send";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";

interface Attachment {
  name: string;
  file: File;
}

const MailForm: React.FC = () => {
  const [mailText, setMailText] = useState<string>("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) => ({
        name: file.name,
        file,
      }));
      setAttachments((prevAttachments) => [...prevAttachments, ...filesArray]);
    }
  };

  return (
    <div className="flex justify-center items-start w-full h-screen p-2">
      <div className="flex flex-col gap-5 w-full max-h-[calc(100vh-80px)] overflow-auto">
        <Textarea
          placeholder="Write your mail here..."
          rows={28}
          className="resize-none min-h-[calc(100vh-180px)]"
          value={mailText}
          onChange={(e) => setMailText(e.target.value)}
        />
        <div className="flex w-full px-2 justify-start items-center gap-8">
          <Send />
          <div className="flex justify-start items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              id="attachments-button"
              className="rounded-full size-8 text-gray-500"
              onClick={() => document.getElementById("attachments")?.click()}
            >
              <Plus />
            </Button>
            <Label
              htmlFor="attachments"
              className="text-gray-500 font-light text-xs hover:text-gray-700 hover:dark:text-gray-300 delay-75"
            >
              Add attachments
            </Label>
            <input
              id="attachments"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="w-full px-2">
          {attachments.length > 0 && (
            <ul className="list-decimal pl-5">
              {attachments.map((attachment, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {attachment.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MailForm;
