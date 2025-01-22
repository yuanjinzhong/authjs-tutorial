* 参考该视频教程:https://www.youtube.com/watch?v=1MTyCvS05V4&t=14068s
* 代码参考该仓库：https://github.com/laoskey/auth-kit

***
# 技术栈
* NextJs
* AuthJs
  * https://authjs.dev/
* shadcn
  * https://ui.shadcn.com/
* tailwind css
* prisma 
  * [云数据库控制台](https://console.prisma.io/clzv105gd001ozckb4i5vbfyx/overview)
* zod

***
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
***

| **命令**                   | **描述**                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| `npm install prisma @prisma/client` | 安装 Prisma 和 Prisma 客户端。                                       |
| `npx prisma --help` 或 `prisma --help` | 查看 Prisma 的帮助信息。                                               |
| `prisma init`              | 生成 `prisma/schema.prisma` 文件。                                       |
| `npx prisma db pull`       | 从数据库中拉取表结构并同步到本地的 `/prisma/schema.prisma` 目录。            |
| `prisma generate`          | 生成客户端代码（类似 MyBatis 的 Mapper 接口）。                          |
| `prisma db push`           | 将修改的表结构推送到数据库。                                               |
| `prisma studio`            | 启动本地数据库控制面板。                                                  |
