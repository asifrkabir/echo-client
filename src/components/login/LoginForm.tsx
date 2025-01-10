"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import { loginValidationSchema } from "@/schemas/auth.schema";
import { IApiResponse } from "@/types";
import { ILoginResponse } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import httpStatus from "http-status";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AppForm from "../form/AppForm";
import AppInput from "../form/AppInput";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

export function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: setUserLoading } = useUser();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending } = useUserLogin();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data, {
      onSuccess: (res: IApiResponse<ILoginResponse>) => {
        if (res.statusCode === httpStatus.OK) {
          setLoginSuccess(true);
          setUserLoading(true);

          toast.success("Login successful!");
        } else {
          setLoginSuccess(false);

          toast.error(res.message);
        }
      },
      onError: (error) => {
        setLoginSuccess(false);

        toast.error(error.message || "Login failed. Please try again.");
      },
    });
  };

  useEffect(() => {
    if (!isPending && loginSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, loginSuccess, redirect, router]);

  return (
    <>
      {isPending && <LoadingSpinner />}
      <Card className="mx-auto max-w-lg w-full m-4">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(loginValidationSchema)}
            >
              <AppInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <div>
                <AppInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </AppForm>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
