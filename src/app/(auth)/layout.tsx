import { AuthHeader } from "@/components/shared/auth-header";

export const runtime = "edge";

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthHeader />
      <main className="relative my-2.5 flex justify-center">{children}</main>
    </>
  );
};

export default SignInLayout;
