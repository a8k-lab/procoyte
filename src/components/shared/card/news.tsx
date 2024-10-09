import Image from "next/image";

type NewsCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
};

export const NewsCard = ({
  title,
  description,
  imageUrl,
  date,
}: NewsCardProps) => {
  return (
    <article className="flex justify-between size-full bg-white overflow-hidden border rounded-xl">
      <div className="w-[120px] md:w-1/3 relative overflow-hidden">
        <Image src={imageUrl} alt={title} className="object-cover" fill />
      </div>

      <div className="w-auto p-2">
        <h1 className="text-lg font-semibold truncate">{title}</h1>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
        <p className="mt-6 font-medium text-xs text-primary text-right">
          {date}
        </p>
      </div>
    </article>
  );
};
