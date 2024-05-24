"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Login from "./login";
import SendTo from "./sendto";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full min-w-72 gap-5">
      <Login />
      <SendTo />
    </div>
  );
};

export default Sidebar;
