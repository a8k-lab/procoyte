"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface RouterButtonProps extends ButtonProps {}
export default function RouterButton({
  children,
  ...props
}: RouterButtonProps) {
  const router = useRouter();
  return (
    <Button {...props} onClick={() => router.back()}>
      {children}
    </Button>
  );
}
