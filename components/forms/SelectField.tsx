import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

const SelectField = ({
  name,
  options,
  placeholder,
  register,
}: selectFieldProps) => {
  return (
    <section className="flex flex-col gap-2">
      <Label>{name}</Label>
      <Select>
        <SelectTrigger className="w-full border-[#212328] focus:border-[#FDD458]!">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
};

export default SelectField;
