import * as Clerk from "@clerk/elements/common";
import type { HTMLInputTypeAttribute } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  name: string;
  label: string;
  suffixLabel?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
};

export const FormField = ({
  name,
  label,
  suffixLabel,
  type = "text",
}: FormFieldProps) => {
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
