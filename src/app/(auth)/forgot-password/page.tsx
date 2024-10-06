"use client";

import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <title>Forgot Password</title>

      <section className="w-[480px] py-6 px-4 bg-background rounded-3xl sm:p-8 sm:border">
        <div className="mb-8 space-y-1">
          <h1 className="text-2xl font-semibold">Forgot Password?</h1>
          <p className="text-sm text-muted-foreground">
            Reset password untuk akun Anda menggunakan alamat email.
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation && (
            <>
              <FormField
                name="email"
                label="Masukkan alamat email"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Kirim kode reset password"}
              </Button>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </>
          )}

          {successfulCreation && (
            <>
              <FormField
                name="password"
                label="Masukkan password baru"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />

              <FormField
                name="code"
                label="Masukkan kode reset password yang dikirimkan ke email"
                onChange={e => setCode(e.target.value)}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Reset"}
              </Button>
              {error && <p className="text-destructive text-sm">{error}</p>}
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
