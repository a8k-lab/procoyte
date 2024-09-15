import type React from "react";

export const runtime = "edge";

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
};

export default SignInLayout;
