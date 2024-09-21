import { AuthFooter } from "@/components/layout/auth-footer";
import { AuthHeader } from "@/components/layout/auth-header";

export const runtime = "edge";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthHeader />
      <main className="relative bg-background flex justify-center sm:bg-transparent sm:my-2.5">
        {children}
      </main>
      <AuthFooter />
    </>
  );
};

export default AuthLayout;
