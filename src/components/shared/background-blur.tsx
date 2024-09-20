import Image from "next/image";

export const BackgroundBlur = () => {
  return (
    <>
      <Image
        src="/images/bg-blur-l.svg"
        alt="Background blur left"
        width={502}
        height={279}
        className="hidden absolute top-32 left-0 md:block"
      />
      <Image
        src="/images/bg-blur-r.svg"
        alt="Background blur right"
        width={573}
        height={468}
        className="absolute top-32 -right-32 md:top-0 md:right-0"
      />
    </>
  );
};
