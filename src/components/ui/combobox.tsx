"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

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
import { cn } from "@/lib/utils";

export function Combobox({
  setInputValue,
  options,
  creatable,
  inputValue,
  async,
  clearable,
  value,
  onChange,
}: {
  setInputValue: (value: string) => void;
  options: { value: string; label: string }[];
  creatable?: boolean;
  inputValue: string;
  async?: boolean;
  clearable?: boolean;
  value: { value: string; label: string } | undefined;
  onChange: (value: { value: string; label: string } | undefined) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col w-min">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? value.label : "Select option..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command shouldFilter={!async}>
            <CommandInput
              onInput={event => {
                setInputValue(event.currentTarget.value);
              }}
              placeholder="Search option..."
            />
            <CommandList>
              {creatable ? (
                <CommandEmpty
                  onClick={() => {
                    if (creatable) {
                      onChange({
                        value: "__new__",
                        label: inputValue,
                      });
                      setOpen(false);
                      setInputValue(inputValue);
                    }
                  }}
                  className="flex cursor-pointer text-xs items-center justify-center gap-1 italic"
                >
                  <p>Create: </p>
                  <p className="block max-w-48 truncate font-semibold text-primary">
                    {inputValue}
                  </p>
                </CommandEmpty>
              ) : (
                <CommandEmpty>No option found.</CommandEmpty>
              )}

              <CommandGroup>
                {options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={currentValue => {
                      if (currentValue !== value?.value) {
                        onChange(option);
                        setInputValue(option.label);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.value === option.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {clearable ? (
        <Button
          size="sm"
          variant="link"
          onClick={() => {
            onChange(undefined);
            setInputValue("");
          }}
          className="w-fit px-0"
        >
          Clear selection{" "}
        </Button>
      ) : null}
    </div>
  );
}
