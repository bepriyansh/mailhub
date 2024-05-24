import React from "react";
import { ThemeToggle } from "../theme/toggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2 border-b backdrop-blur-sm sticky top-0">
      <Link href="/" className="flex flex-col justify-start items-start">
        <div className="text-lg font-semibold">maiLkaro</div>
        <div className="text-xs text-muted-foreground">
          Bulk mailing service
        </div>
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default Header;
