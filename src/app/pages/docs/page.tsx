import Link from "next/link";
import React from "react";

const convertUrlsToLinksInLine = (line: string) => {
  const urlRegex = /https?:\/\/[^\s]+/g;
  const matches = line.match(urlRegex);

  if (!matches) {
    return line;
  }

  return line.split(urlRegex).flatMap((part, index) => {
    if (index < matches.length) {
      const match = matches[index];
      return (
        <React.Fragment key={index}>
          {part}
          <Link
            href={match}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match}
          </Link>
        </React.Fragment>
      );
    }
    return part;
  });
};

const loginMailLine =
  "Enable 2-Step Verification and generate Application password for your google account, then you can use the generated password to send emails using nodemailer. To do so you need to do the following:";

const loginSteps = `Go to your Google account at https://myaccount.google.com/
  Go to Security
  Choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification
  Visit https://myaccount.google.com/apppasswords to create your app.
  Put a name e.g. nodemailer to your app and create it.
  A modal dialog will appear with the password. Get that password and use it in your code.`;

const Docs = () => {
  const loginStepArray = loginSteps.split("\n");
  return (
    <div className="flex justify-center items-start w-full h-screen p-2">
      <div className="px-4 py-2 border rounded-lg max-h-[calc(100vh-80px)] overflow-auto">
        <div className="text-2xl font-semibold py-2">How to Login : </div>
        <div className="text-lg py-2">{loginMailLine}</div>
        <div className="flex flex-col gap-1 text-md bg-cyan-500/20 rounded-lg p-2">
          {loginStepArray.map((loginStep, index) => (
            <div key={index} className="flex gap-2 justify-start items-start">
              <div>{index + 1}. </div>
              <p className="break-words">
                {convertUrlsToLinksInLine(loginStep)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Docs;
