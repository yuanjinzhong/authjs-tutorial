"use server";
import { LoginSchema } from "@/schemas";
import * as Z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (
  values: Z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "invalid fields" };
  }

  const { email, password, code } = validateField.data;

  const existUser = await getUserByEmail(email);
  console.log(existUser);
  // 数据完整性校验
  if (!existUser || !existUser.email || !existUser.password) {
    return { error: "Invalid credentials:Email or password not exist!" };
  }

  // 本人邮箱验证
  if (!existUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existUser.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent " };
  }

  //如果开启两阶段验证 且有email
  if (existUser.isTwoFactorEnabled && existUser.email) {
    // 两阶段验证码校验
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existUser.email);
      // 2阶段验证码记录不存在
      if (!twoFactorToken) {
        return { error: "invalid code" };
      }
      // 2阶段验证码不匹配
      if (twoFactorToken.token !== code) {
        return { error: "invalid code" };
      }
      //验证吗是否过期
      if (new Date(twoFactorToken.expires) < new Date()) {
        return { error: "Code expired" };
      }
      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
        existUser.id,
      );

      if (twoFactorConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existUser.id,
        },
      });
    } else {
      // 发送两阶段验证码
      const twoFactorToken = await generateTwoFactorToken(existUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    /*todo "credentials" 登陆*/
    /*   await signIn("credentials", {
                 email,
                 password,
                 redirectTo: callbackUrl || DEFAULT_LOGGIN_REDIRECT,
               });*/
  } catch (e) {}
};
