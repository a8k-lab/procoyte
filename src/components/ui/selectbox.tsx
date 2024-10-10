import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

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
import { ScrollArea } from "@/components/ui/scroll-area";

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  value?: Option[];
  onChange?: (values: Option[]) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  emptyPlaceholder?: string;
  className?: string;
  setSearchTerm: (search: string) => void;
  searchTerm: string;
  creatable?: boolean;
}

const SelectBox = React.forwardRef<HTMLInputElement, SelectBoxProps>(
  (
    {
      inputPlaceholder,
      emptyPlaceholder,
      placeholder,
      className,
      options,
      value,
      onChange,
      searchTerm,
      setSearchTerm,
      creatable,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const selectedValues = value?.map(v => v.value);

    const handleSelect = (selectedValue: Option) => {
      const newValue =
        selectedValues?.includes(selectedValue.value) && Array.isArray(value)
          ? value.filter(v => v.value !== selectedValue.value)
          : [...(value ?? []), selectedValue];
      onChange?.(newValue);
    };

    const handleClear = () => {
      onChange?.([]);
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "flex min-h-[36px] cursor-pointer items-center justify-between rounded-md border px-3 py-1 data-[state=open]:border-ring w-full h-full",
              className,
            )}
          >
            <div
              className={cn(
                "items-center gap-1 overflow-hidden text-sm flex flex-grow flex-wrap ",
              )}
            >
              {value && value.length > 0 ? (
                value?.map(option => (
                  <span
                    key={option.value}
                    className="inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <span>{option.label}</span>
                    <span
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSelect(option);
                        }
                      }}
                      onClick={e => {
                        e.preventDefault();
                        handleSelect(option);
                      }}
                      className="flex items-center rounded-sm px-[1px] text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground"
                    >
                      <Cross2Icon />
                    </span>
                  </span>
                ))
              ) : (
                <span className="mr-auto text-muted-foreground">
                  {placeholder}
                </span>
              )}
            </div>
            <div className="flex items-center self-stretch pl-1 text-muted-foreground/60 hover:text-foreground [&>div]:flex [&>div]:items-center [&>div]:self-stretch">
              {value && value.length > 0 ? (
                <div
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleClear();
                    }
                  }}
                  onClick={e => {
                    e.preventDefault();
                    handleClear();
                  }}
                >
                  <Cross2Icon className="size-4" />
                </div>
              ) : (
                <div>
                  <CaretSortIcon className="size-4" />
                </div>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <div className="relative">
              <CommandInput
                value={searchTerm}
                onValueChange={e => setSearchTerm(e)}
                ref={ref}
                placeholder={inputPlaceholder ?? "Search..."}
                className="h-9"
              />
              {searchTerm && (
                <div
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setSearchTerm("");
                    }
                  }}
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm("")}
                >
                  <Cross2Icon className="size-4" />
                </div>
              )}
            </div>
            <CommandList>
              <CommandEmpty className="py-1 flex justify-center">
                {creatable ? (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      onChange?.([
                        ...(value ?? []),
                        {
                          value: "__new__",
                          label: searchTerm ?? "Create",
                        },
                      ]);
                      setSearchTerm("");
                      setIsOpen(false);
                    }}
                  >
                    Create {searchTerm}
                  </Button>
                ) : (
                  (emptyPlaceholder ?? "No results found.")
                )}
              </CommandEmpty>
              <CommandGroup>
                <ScrollArea>
                  <div className="max-h-64">
                    {options?.map(option => {
                      const isSelected =
                        Array.isArray(value) &&
                        selectedValues?.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          // value={option.value}
                          onSelect={() => handleSelect(option)}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible",
                            )}
                          >
                            <CheckIcon />
                          </div>

                          <span>{option.label}</span>
                        </CommandItem>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

SelectBox.displayName = "SelectBox";

export default SelectBox;
