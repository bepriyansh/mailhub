import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SendTo = () => {
  const [emails, setEmails] = useState([]);
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col w-full justify-normal items-start border rounded-lg p-2 gap-2">
        <div className="text-sm px-2">Send to :</div>
        <div className="flex flex-wrap justify-start items-center w-full gap-1 max-h-96 overflow-y-auto">
          {emails.length === 0 && (
            <div className="text-xs text-muted-foreground text-center w-full py-8">
              Add mail addresses
            </div>
          )}
          {emails.map((email, i) => (
            <Popover key={i}>
              <PopoverTrigger>
                <div className="border rounded-lg px-2 py-1 cursor-pointer text-sm bg-white/10">
                  {email}
                </div>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 w-max p-2 bg-cyan-50/10 backdrop-blur-xl">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex justify-normal"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex justify-normal"
                >
                  Remove
                </Button>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-5 w-full">
        <Popover>
          <PopoverTrigger className="border rounded-lg p-2 cursor-pointer hover:bg-secondary text-sm">
            Add new mail
          </PopoverTrigger>
          <PopoverContent className="w-max flex flex-col justify-center items-end gap-3 bg-white/10 backdrop-blur">
            <Input placeholder="Add email" />
            <Button>Add</Button>
          </PopoverContent>
        </Popover>
        <Button className="max-w-80">Upload via Excel</Button>
      </div>
    </div>
  );
};

export default SendTo;
