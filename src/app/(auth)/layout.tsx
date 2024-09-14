import type React from 'react';

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      {children}
    </div>
  );
};

export default SignInLayout;
