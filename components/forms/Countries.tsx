"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReactCountryFlag from "react-country-flag";
import { getCode, getNames } from "country-list";

type comboboxCountries={

onCountryChange?:(countryCode:string)=>void
}

const countries = getNames().map((name) => ({
  name,
  code: getCode(name) || "US",
}));

export default function ComboboxCountries({onCountryChange}:comboboxCountries) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full bg-[#141414] cursor-pointer hover:bg-[#141414] hover:text-white border-0 justify-between"
        >
          {value ? (
            <div className="flex   items-center  gap-2">
              <ReactCountryFlag
                svg
                countryCode={value}
                style={{ width: "1.5em", height: "1.5em" }}
              />
              <span>{countries.find((c) => c.code === value)?.name}</span>
            </div>
          ) : (
            "Select country..."
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] bg-white p-0">
        <Command>
          <CommandInput
            placeholder="Search country..."
            className="h-9 "
            value={search}
            onValueChange={(text) => setSearch(text)}
          />
          <CommandList className="bg-white">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ReactCountryFlag
                      svg
                      countryCode={country.code}
                      style={{ width: "1.5em", height: "1.5em" }}
                    />
                    <span>{country.name}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
