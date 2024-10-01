import * as Clerk from "@clerk/elements/common";
import type { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  suffixLabel?: React.ReactNode;
};

export const ClerkField = ({
  name,
  label,
  suffixLabel,
  type = "text",
}: FieldProps) => {
  return (
    <Clerk.Field name={name} className="space-y-2">
      <Clerk.Label asChild>
        <div className="flex items-center justify-between">
          <Label className="text-base">{label}</Label>
          {Boolean(suffixLabel) && suffixLabel}
        </div>
      </Clerk.Label>
      <Clerk.Input type={type} required asChild>
        <Input placeholder={`Masukkan ${label}`} />
      </Clerk.Input>
      <Clerk.FieldError className="block text-sm text-destructive" />
    </Clerk.Field>
  );
};

export const FormField = ({ name, label, type = "text" }: FieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-base">
        {label}
      </Label>
      <Input type={type} name={name} required />
    </div>
  );
};
