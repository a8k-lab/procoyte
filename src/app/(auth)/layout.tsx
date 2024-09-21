import { AuthFooter } from "@/components/layout/auth-footer";
import { AuthHeader } from "@/components/layout/auth-header";
import { cn } from "@/lib/utils";

export const runtime = "edge";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthHeader />
      <main
        className={cn(
          // 154px = AuthHeader height + AuthFooter height (84px + 70px)
          "min-h-[calc(100vh-154px)] flex items-center justify-center",
          "relative bg-background sm:bg-transparent sm:py-2.5",
        )}
      >
        {children}
      </main>
      <AuthFooter />
    </>
  );
};

export default AuthLayout;
