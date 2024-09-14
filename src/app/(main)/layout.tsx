import type { Metadata } from 'next';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Bytecott',
  description:
    'ByteCott helps you make informed choices by tracking global boycott campaigns on products and brands. Join the movement to support ethical consumerism with real-time updates and insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className='flex items-center justify-between gap-4 px-4 py-2 sm:px-6 sm:py-4'>
        Bytecott
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
      {children}
    </>
  );
}
