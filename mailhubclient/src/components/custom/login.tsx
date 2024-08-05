"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";

const getAuthToken = () => {
  const token = getCookie("auth-token");
  const email = getCookie("email");
  return [token, email];
};

const Login = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>();
  const [email, setEmail] = useState<string>();

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    let [tok, mail] = getAuthToken();
    setToken(tok);
    setEmail(mail);
  }, []);

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
          Authorization: `Bearer ${process.env.SECRET_KEY as string}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      })
        .then((res) => res.json())
        .then((data) =>
          toast(data.message, {
            action: {
              label: "Close",
              onClick: () => {},
            },
          })
        )
        .then(() => {
          let [tok, mail] = getAuthToken();
          setToken(tok);
          setEmail(mail);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogOut = () => {
    deleteCookie("auth-token");
    deleteCookie("email");
    let [tok, mail] = getAuthToken();
    setToken(tok);
    setEmail(mail);
  };
  return (
    <div>
      {token ? (
        <div className="flex w-full justify-between items-center bg-cyan-50/5 border rounded-lg p-2 gap-2 overflow-hidden">
          <div className="text-xs">{email}</div>
          <Button
            variant="secondary"
            className="text-xs"
            onClick={handleLogOut}
          >
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
            type="email"
            onChange={(e) =>
              setCreds((prevCreds) => ({ ...prevCreds, email: e.target.value }))
            }
          />
          <Input
            placeholder="Password"
            type="password"
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
