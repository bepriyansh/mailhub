"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Login from "./login";
import SendTo from "./sendto";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-25px)] w-full min-w-72 \">
      <div className="flex flex-col w-full gap-5">
        <Login />
        <SendTo />
      </div>
      <div className="flex w-full justify-center items-center text-muted-foreground">
        <Link
          href="https://priyaaanshh.vercel.app/"
          className="text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          @priyaaansh
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
