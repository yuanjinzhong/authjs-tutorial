import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({ where: { email } });
  } catch (e) {
    return null;
  }
};
