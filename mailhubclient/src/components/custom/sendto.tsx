"use client";
import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getEmailCol, getEmailsFromCol } from "@/utils/emailUtils";
import { useDispatch, useSelector } from 'react-redux';
import { setRecipients } from '../../store/emailSlice'


const SendTo = () => {
  const dispatch = useDispatch();

  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    dispatch(setRecipients(emails));
  }, [emails]);

  const addExcelFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, {
          header: 1,
        });
        const index = getEmailCol(jsonData);
        const emailIds = getEmailsFromCol(jsonData, index);
        setEmails((prevEmailIds) => [...prevEmailIds, ...emailIds]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col w-full justify-normal items-start border rounded-lg p-2 gap-2">
        <div className="flex justify-between items-center w-full px-2">
          <div className="text-sm">Send to :</div>
          <div className="text-muted-foreground text-xs">
            {emails.length} emails
          </div>
        </div>
        <div className="flex flex-wrap justify-start items-center w-full gap-1 max-h-[calc(100vh-380px)] overflow-y-auto">
          {emails.length === 0 && (
            <div className="text-xs text-muted-foreground text-center w-full py-8">
              Add mail addresses
            </div>
          )}
          {emails.map((email, i) => (
            <Popover key={i}>
              <PopoverTrigger>
                <div className="border rounded-lg px-2 py-1 cursor-pointer text-sm bg-white/10 break-words text-left">
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
        <Input
          type="file"
          accept=".xlsx, .xls"
          className="hidden"
          id="fileupload"
          onChange={addExcelFile}
        />
        <Label htmlFor="fileupload">
          <div className="border p-3 text-primary-foreground rounded-lg bg-primary cursor-pointer ">
            Upload via Excel
          </div>
        </Label>
      </div>
    </div>
  );
};

export default SendTo;
