import React from "react";
import { ThemeToggle } from "../theme/toggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 border-b backdrop-blur-sm sticky top-0">
      <Link
        href="/"
        className="flex justify-center items-center gap-1 font-semibold font-sans"
      >
        <div className="text-xl">Mail</div>
        <div className="bg-[#f79a24] px-1 rounded text-black">hub</div>
      </Link>
      <div className="flex justify-start items-center gap-5">
        <Link href="/pages/docs" className="text-muted-foreground">
          Docs
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
