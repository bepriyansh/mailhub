import { Separator } from "@/components/ui/separator";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex h-12 justify-center items-center gap-2 mx-3">
        <div className="text-3xl ">404</div>
        <Separator orientation="vertical" />
        <div className="text-md">This page could not be found.</div>
      </div>
    </div>
  );
};

export default NotFound;
