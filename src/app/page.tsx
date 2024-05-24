import Header from "@/components/custom/header";
import MailForm from "@/components/custom/mailform";
import React from "react";

const Page = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-start w-full">
        <div className="flex flex-col w-full max-w-[1280px] mt-3 gap-2">
          <MailForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
