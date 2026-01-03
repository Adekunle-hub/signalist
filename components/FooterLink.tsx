import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const FooterLink = ({ text, action, link }: footerLink) => {
  return (
    <footer className="my-4 flex items-center gap-1 justify-center">
      {text}
      <Link
        href={link}
        className="bg-transparent p-0! m-0! hover:bg-transparent cursor-pointer font-bold"
      >
        {action}
      </Link>
    </footer>
  );
};

export default FooterLink;
