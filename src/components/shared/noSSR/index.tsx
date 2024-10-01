"use client";
import { useEffect, useState } from "react";

export default function NoSSR({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isServer, setServer] = useState(true);
  useEffect(() => {
    setServer(false);
  }, []);

  return isServer ? null : children;
}
