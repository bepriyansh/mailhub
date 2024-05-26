import MailForm from "@/components/custom/mailform";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-start w-full">
      <div className="flex flex-col w-full gap-2">
        <MailForm />
      </div>
    </div>
  );
};

export default Page;
