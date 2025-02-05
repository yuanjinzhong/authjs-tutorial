"use server";
import { LoginSchema } from "@/schemas";
import * as Z from "zod";

export const login = async (
  values: Z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  console.log("server action login", values, callbackUrl);
  const validateField = LoginSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "invalid fields" };
  }

  const { email, password, code } = validateField.data;

  if (1 == 1) {
    return { twoFactor: true };
  }

  return { success: "登陆成功" };
};
