import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const TextSeparator = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)} {...props}>
      <div className="flex-grow border-t border" />
      <p className="text-xs text-muted-foreground">{children}</p>
      <div className="flex-grow border-t border" />
    </div>
  );
};
