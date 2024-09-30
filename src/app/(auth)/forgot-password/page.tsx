"use client";

import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/");
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch(err => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then(result => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <>
      <title>Procoyte | Forgot Password</title>

      <section className="w-[480px] py-6 px-4 bg-background rounded-3xl sm:p-8 sm:border">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password?</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation && (
            <div className="space-y-2">
              <Label htmlFor="email">Masukkan alamat email Anda</Label>
              <Input
                type="email"
                placeholder="e.g john@doe.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Kirim kode reset password</Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          )}

          {successfulCreation && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Masukkan password baru</Label>
                <Input
                  type="password"
                  placeholder="***"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">
                  Masukkan kode reset password yang dikirimkan ke email
                </Label>
                <Input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                />
              </div>

              <Button type="submit">Reset</Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </>
          )}

          {secondFactor && (
            <p className="text-yellow-500 text-sm">
              2FA is required, but this UI does not handle that
            </p>
          )}
        </form>
      </section>
    </>
  );
}
