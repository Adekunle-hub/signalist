"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UseFormRegisterReturn } from "react-hook-form";

const InputField = ({
  name,
  label,
  placeholder,
  type,
  register,
  validation,
  error,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-white " htmlFor={name}>
        {label}
      </Label>
      <Input
        className="border border-gray-600 focus:border-[#FDD458]! focus:ring-0   focus-visible:ring-0 focus:outline-none text-white p-2 rounded-sm "
        id={name}
        placeholder={placeholder}
        {...register(name, validation)}
        type={type}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
