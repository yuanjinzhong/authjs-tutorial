"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import * as Z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/auth/CardWrapper";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAcountNotLinked"
      ? "Email already in use with differrnt provider!"
      : "";
  const [isPending, startTransition] = useTransition();
  const [show2FA, setShow2FA] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<Z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  function submit(values: Z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await login(values, callbackUrl);
        if (data?.error) {
          form.reset();
          setError(data.error);
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }
        if (data?.twoFactor) {
          form.reset();
          setShow2FA(data.twoFactor);
        }
      } catch (e) {
        console.log(e);
        setError("Something went wrong");
      }
    });
  }

  return (
    <CardWrapper
      backButtonHref="/register"
      backButtonLabel="Dont have an account"
      headerLabel="Welecome back"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className={"space-y-6"}>
          <div className={"space-y-4"}>
            {show2FA && (
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"123456"}
                        disabled={isPending}
                        type={"text"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!show2FA && (
              <>
                <FormField
                  control={form.control}
                  name={"email"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={"xxx@example.com"}
                          type={"email"}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={"password"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={"******"}
                          type={"password"}
                        />
                      </FormControl>
                      <Button
                        size={"sm"}
                        variant={"link"}
                        asChild
                        className={"px-0 font-normal"}
                      >
                        <Link href={"/reset"}>Forget Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className={"w-full"} type={"submit"} disabled={isPending}>
            {show2FA ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
