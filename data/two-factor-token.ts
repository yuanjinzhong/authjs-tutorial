import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    /* 在 try...catch 之外，return await 通常是 不必要的，因为 async 函数会自动返回 Promise。
     在 try...catch 内部，return await 是有意义的，因为它允许 catch 正确捕获 await 失败时的错误。
     ESLint 的 no-return-await 规则会自动处理这些情况，只在 try...catch 外部才提示去掉 await。*/
    return await db.twoFactorToken.findUnique({
      where: { token },
    });
  } catch {
    return null;
  }
};
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return await db.twoFactorToken.findFirst({
      where: { email },
    });
  } catch {
    return null;
  }
};
