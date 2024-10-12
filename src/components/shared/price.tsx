export default function Price({ price }: { price: number }) {
  // Render in dollar $ - $$$$$
  return (
    <span className="text-sm text-primary">
      {Array.from({ length: price ?? 0 }).map(_ => "$")}
    </span>
  );
}
