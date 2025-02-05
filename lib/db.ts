import { PrismaClient } from "@prisma/client";

declare global {
  /* eslint-disable no-var */
  var prisma: PrismaClient | undefined;
  /* eslint-enable no-var */
}

function getPrismaClient() {
  // 生产环境每次请求创建新的客户端
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }
  // 开发环境：使用 globalThis 缓存实例，防止热重载时重复创建
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  return globalThis.prisma;
}

export const db = getPrismaClient();
