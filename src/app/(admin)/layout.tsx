import { AdminHeader } from "@/components/layout/admin-header";
import { cn } from "@/lib/utils";
import { Protect } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { orgId } = auth();
  return (
    <>
      <AdminHeader />
      <main
        className={cn(
          "mt-[56px] mx-auto sm:mt-[72px]",
          "py-12 px-4 md:py-[84px] xs:px-6 sm:px-10",
          "relative w-full text-center max-w-7xl",
        )}
      >
        {orgId ? null : (
          <h1 className="text-center text-2xl font-bold text-text-primary">
            Silahkan Pilih Organisasi Admin Untuk Mengakses Halaman Admin
          </h1>
        )}
        {/* biome-ignore lint: false positive */}
        <Protect role="org:admin">{children}</Protect>
      </main>
    </>
  );
}
