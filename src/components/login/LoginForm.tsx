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
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AppForm from "../form/AppForm";
import AppInput from "../form/AppInput";

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

  const handleDemoLogin = (role: "user" | "admin") => {
    const credentials =
      role === "admin"
        ? { email: "guest.admin@demo.com", password: "n3n4f098v103g" }
        : { email: "guest.user@demo.com", password: "fvubeviub298g2" };

    handleSubmit(credentials);
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

            <div className="mb-4">
              <AppInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />

              <Link href="/forgot-password" className="underline text-sm">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </AppForm>

          <div className="flex flex-wrap justify-around mt-4 gap-4">
            <Button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700"
            >
              Login as User
            </Button>
            <Button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-700"
            >
              Login as Admin
            </Button>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
