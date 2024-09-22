import * as Clerk from "@clerk/elements/common";
import type { HTMLInputTypeAttribute } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
};

export const FormField = ({ name, label, type = "text" }: FormFieldProps) => {
  return (
    <Clerk.Field name={name} className="space-y-2">
      <Clerk.Label asChild>
        <Label className="text-base">{label}</Label>
      </Clerk.Label>
      <Clerk.Input type={type} required asChild>
        <Input placeholder={`Masukkan ${label}`} />
      </Clerk.Input>
      <Clerk.FieldError className="block text-sm text-destructive" />
    </Clerk.Field>
  );
};
