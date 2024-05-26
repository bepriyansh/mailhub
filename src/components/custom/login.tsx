"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (creds.email === "" || creds.password === "") {
      toast("Email & Passkeys required", {
        description: "Please fill both the fields properly",
        action: {
          label: "See Docs",
          onClick: () => {
            router.push("/pages/docs");
          },
        },
      });
      return;
    }
    try {
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {creds.email === "abbadabbajabba" ? (
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
          <Input
            placeholder="Email"
            onChange={(e) =>
              setCreds((prevCreds) => ({ ...prevCreds, email: e.target.value }))
            }
          />
          <Input
            placeholder="Password"
            onChange={(e) =>
              setCreds((prevCreds) => ({
                ...prevCreds,
                password: e.target.value,
              }))
            }
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}
    </div>
  );
};

export default Login;
