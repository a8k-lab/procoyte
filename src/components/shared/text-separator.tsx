export const TextSeparator = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-grow border-t border" />
      <p className="text-xs text-muted-foreground">{children}</p>
      <div className="flex-grow border-t border" />
    </div>
  );
};
