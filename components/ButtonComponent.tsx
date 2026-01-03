import React, { ButtonHTMLAttributes, FC } from "react";
import { Button } from "./ui/button";

interface ButtonComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonComponent: FC<ButtonComponentProps> = ({ children, className = "", ...props }) => {
  return (
    <Button
      className={`bg-linear-to-r from-[#FDD458] to-[#E8BA40] text-black font-bold text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.2)] py-1 px-4 cursor-pointer rounded-md ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
