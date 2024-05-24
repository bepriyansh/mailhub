"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const Login = () => {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  return (
    <div>
      {creds.email !== "" ? (
        <div className="flex w-full justify-between items-center bg-cyan-50/5 border rounded-lg p-2 gap-2 overflow-hidden">
          <div className="text-primary text-xs">{creds.email}</div>
          <Button variant="secondary" className="text-xs">
            Log out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-96 justify-normal items-start border rounded-lg p-2 gap-2">
          <div className="text-muted-foreground text-sm">
            Enter your email & passkey
          </div>
          <Input placeholder="Email" />
          <Input placeholder="Gmail generated passkey" type="password"/>
          <Button>Login</Button>
        </div>
      )}
    </div>
  );
};

export default Login;
