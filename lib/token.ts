import { db } from "@/lib/db";
import { v4 as uuidV4 } from "uuid";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import crypt from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existToken = await getVerificationTokenByEmail(email);
  if (existToken) {
    // 理论上 lib包里面不直接操作db,这个lib包类似于java里面的service层，应该写在data/verification-token.ts里面（相当于java里面的dao层）
    await db.verificationToken.delete({ where: { id: existToken.id } });
  }
  // 这里不需要加上 await，但是有try catch 则需要await
  return db.verificationToken.create({ data: { email, token, expires } });
};

export const generateTwoFactorToken = async (email: string) => {
  // 生成6位随机数验证码，之所以不用uuidV4 是因为它生成的是类似：a2a8e338-86b1-4b2f-9d15-9f9d24892e91。不利于用户输入
  const token = crypt.randomInt(100_000, 1_000_000).toString();
  // 3600秒，再乘以1000 就是毫秒
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existToken = await getTwoFactorTokenByEmail(email);

  // 删除旧的
  if (existToken) {
    await db.twoFactorToken.delete({
      where: { id: existToken.id },
    });
  }

  // 重新生成
  return db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
