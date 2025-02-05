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
This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

| **命令**                                | **描述**                                        |
|---------------------------------------|-----------------------------------------------|
| `npm install prisma @prisma/client`   | 安装 Prisma 和 Prisma 客户端。                       |
| `npx prisma --help` 或 `prisma --help` | 查看 Prisma 的帮助信息。                              |
| `prisma init`                         | 生成 `prisma/schema.prisma` 文件。                 |
| `npx prisma db pull`                  | 从数据库中拉取表结构并同步到本地的 `/prisma/schema.prisma` 目录。 |
| `prisma generate`                     | 生成客户端代码（类似 MyBatis 的 Mapper 接口）。              |
| `prisma db push`                      | 将修改的表结构推送到数据库。                                |
| `prisma studio`                       | 启动本地数据库控制面板。                                  |

***

# Next.js 项目文件结构分析

### 整体结构

这个 Next.js 项目是一个包含用户认证、权限管理和部分管理后台功能的应用。它使用了 NextAuth.js 进行用户认证，Prisma 作为
ORM，并采用了 Tailwind CSS 进行样式化。

### 详细文件说明

#### 根目录

* **README.md:** 项目说明文档
* **package.json:** 项目依赖配置文件
* **next.config.js:** Next.js 配置文件
* **tsconfig.json:** TypeScript 配置文件
* **postcss.config.mjs:** PostCSS 配置文件
* **tailwind.config.js:** Tailwind CSS 配置文件

#### src 目录 (假设代码主要放在 src 目录下)

* **components:**
    * **ui:** 基础 UI 组件 (基于 Shadcn UI)
    * **auth:** 认证相关组件 (登录表单、用户头像等)
* **pages:**
    * **auth:** 认证相关页面 (登录、注册、重置密码等)
    * **dashboard:** 用户仪表盘
    * **admin:** 管理员页面
* **hooks:**
    * **useCurrentUser.ts:** 获取当前用户信息
* **lib:**
    * **utils.ts:** 通用工具函数
    * **api.ts:** 封装 API 请求
* **styles:** 全局样式文件
* **data:** 数据模型定义或接口

#### 其他目录

* **public:** 静态资源
* **prisma:** Prisma ORM 配置
* **actions:** 服务器端动作 (Next.js 13 中的新特性)

### 详细分析

* **components:** 组件库是项目的核心部分，提供了可复用的 UI 组件。
* **pages:** 组织页面的目录，每个页面对应一个 .js 或 .tsx 文件。
* **hooks:** 自定义 Hook 可以帮助你抽离组件中的逻辑，提高代码复用性。
* **lib:** 工具函数库可以存放一些通用的工具函数，例如日期格式化、数据校验等。
* **prisma:** Prisma ORM 用于与数据库交互，简化数据库操作。
* **actions:** 在 Next.js 13 中，actions 可以用于处理服务器端的逻辑，例如数据获取、表单提交等。

### 总结

这个 Next.js 项目的结构清晰，代码组织合理。通过这种结构，可以有效地管理项目代码，提高开发效率。

### 更多细节

* **components/auth:** 包含登录表单、注册表单、忘记密码表单等组件。
* **lib/api:** 封装了与后端 API 交互的函数，例如获取用户信息、更新用户信息等。

**你可以根据你的项目需求，对这个 Markdown 文档进行进一步的定制和扩展。**

## 文件树

```markdown
├── README.md  <!-- 项目文档，包含项目描述、安装和使用说明 -->
├── actions  <!-- 存放所有的服务端操作文件，通常是一些服务器行为函数，主要用于处理如登录、注册、密码重置等逻辑 -->
│ ├── admin.ts  <!-- 处理管理员相关的服务端操作，如管理用户或设置 -->
│ ├── login-gitgub.ts  <!-- GitHub 登录处理 -->
│ ├── login.ts  <!-- 普通登录处理 -->
│ ├── logout.ts  <!-- 处理用户登出操作 -->
│ ├── new-password.ts  <!-- 重置密码逻辑 -->
│ ├── new-verification.ts  <!-- 新验证码生成或验证的处理 -->
│ ├── register.ts  <!-- 用户注册处理 -->
│ ├── reset-password.tsx  <!-- 重置密码的表单页面 -->
│ └── settings.ts  <!-- 设置相关的服务端操作 -->
├── app  <!-- Next.js 13的App目录，存放不同页面和布局的逻辑 -->
│ ├── (auth)  <!-- 认证相关的页面和逻辑 -->
│ │ ├── error  <!-- 错误处理页面 -->
│ │ │ └── page.tsx  <!-- 错误页面，通常用于用户认证失败或权限不足时的显示 -->
│ │ ├── layout.tsx  <!-- 认证模块的布局文件，包含页面头部、底部等通用部分 -->
│ │ ├── login  <!-- 登录页面 -->
│ │ │ └── page.tsx  <!-- 登录表单组件 -->
│ │ ├── new-password  <!-- 新密码设置页面 -->
│ │ │ └── page.tsx  <!-- 新密码设置表单 -->
│ │ ├── new-verification  <!-- 新验证码页面 -->
│ │ │ └── page.tsx  <!-- 新验证码表单 -->
│ │ ├── register  <!-- 注册页面 -->
│ │ │ └── page.tsx  <!-- 注册表单组件 -->
│ │ └── reset  <!-- 密码重置页面 -->
│ │ └── page.tsx  <!-- 密码重置表单组件 -->
│ ├── (protected)  <!-- 受保护路由，只有认证用户才能访问的页面 -->
│ │ ├── _components  <!-- 受保护路由下的通用组件 -->
│ │ │ └── NavBar.tsx  <!-- 导航栏组件 -->
│ │ ├── admin  <!-- 管理员页面 -->
│ │ │ └── page.tsx  <!-- 管理员控制面板 -->
│ │ ├── client  <!-- 客户端页面 -->
│ │ │ └── page.tsx  <!-- 客户端面板 -->
│ │ ├── layout.tsx  <!-- 受保护页面的通用布局 -->
│ │ ├── server  <!-- 服务器页面 -->
│ │ │ └── page.tsx  <!-- 服务器管理页面 -->
│ │ └── setting  <!-- 设置相关页面 -->
│ │ ├── CSRPage.tsx  <!-- 客户端渲染的设置页面 -->
│ │ ├── SSRPage.tsx  <!-- 服务端渲染的设置页面 -->
│ │ └── page.tsx  <!-- 设置页面入口 -->
│ ├── api  <!-- API路由 -->
│ │ ├── [...nextauth]  <!-- NextAuth API路由，用于处理认证相关的API请求 -->
│ │ │ └── route.ts  <!-- NextAuth的路由配置 -->
│ │ └── admin  <!-- 管理员API -->
│ │ └── route.ts  <!-- 管理员操作相关的API路由 -->
│ ├── favicon.ico  <!-- 网站图标 -->
│ ├── fonts  <!-- 字体资源 -->
│ │ ├── GeistMonoVF.woff  <!-- 字体文件 -->
│ │ └── GeistVF.woff  <!-- 字体文件 -->
│ ├── globals.css  <!-- 全局CSS样式 -->
│ ├── layout.tsx  <!-- 应用的全局布局 -->
│ └── page.tsx  <!-- 应用的首页 -->
├── auth.config.ts  <!-- 认证相关的配置文件 -->
├── auth.ts  <!-- 认证逻辑实现文件 -->
├── components  <!-- 存放UI组件，包含自定义组件和ShadCN UI封装组件 -->
│ ├── FormError.tsx  <!-- 表单错误提示组件 -->
│ ├── FormSuccess.tsx  <!-- 表单成功提示组件 -->
│ ├── auth  <!-- 与认证相关的UI组件 -->
│ │ ├── BackButton.tsx  <!-- 返回按钮组件 -->
│ │ ├── CardWrapper.tsx  <!-- 包裹认证表单的卡片组件 -->
│ │ ├── ErrorCard.tsx  <!-- 显示错误的卡片组件 -->
│ │ ├── Header.tsx  <!-- 认证页面的头部组件 -->
│ │ ├── LoginButtoon.tsx  <!-- 登录按钮组件 -->
│ │ ├── LoginForm.tsx  <!-- 登录表单组件 -->
│ │ ├── LogoutButton.tsx  <!-- 登出按钮组件 -->
│ │ ├── NewPasswordForm.tsx  <!-- 新密码表单组件 -->
│ │ ├── NewVerificationForm.tsx  <!-- 新验证码表单组件 -->
│ │ ├── RegisterForm.tsx  <!-- 注册表单组件 -->
│ │ ├── ResetForm.tsx  <!-- 密码重置表单组件 -->
│ │ ├── RoleGate.tsx  <!-- 权限控制组件 -->
│ │ ├── Social.tsx  <!-- 社交登录组件 -->
│ │ └── UserButton.tsx  <!-- 用户信息按钮组件 -->
│ └── ui  <!-- ShadCN UI封装组件 -->
│ ├── UserInfo.tsx  <!-- 用户信息显示组件 -->
│ ├── avatar.tsx  <!-- 头像组件 -->
│ ├── badge.tsx  <!-- 徽章组件 -->
│ ├── button.tsx  <!-- 按钮组件 -->
│ ├── card.tsx  <!-- 卡片组件 -->
│ ├── dialog.tsx  <!-- 对话框组件 -->
│ ├── dropdown-menu.tsx  <!-- 下拉菜单组件 -->
│ ├── form.tsx  <!-- 表单组件 -->
│ ├── input.tsx  <!-- 输入框组件 -->
│ ├── label.tsx  <!-- 标签组件 -->
│ ├── select.tsx  <!-- 选择框组件 -->
│ ├── sonner.tsx  <!-- 提示框组件 -->
│ └── switch.tsx  <!-- 开关组件 -->
├── components.json  <!-- 组件相关的配置文件 -->
├── data  <!-- 类似java里面的dao层 -->
│ ├── account.ts  <!-- 用户账户数据 -->
│ ├── password-reset-token.ts  <!-- 密码重置令牌数据 -->
│ ├── two-factor-confirmation.ts  <!-- 二步验证确认数据 -->
│ ├── two-factor-token.ts  <!-- 二步验证令牌数据 -->
│ ├── user.ts  <!-- 用户数据 -->
│ └── verification-token.ts  <!-- 验证令牌数据 -->
├── hooks  <!-- 自定义Hooks -->
│ ├── use-current-role.ts  <!-- 获取当前用户角色的Hook -->
│ └── use-current-user.ts  <!-- 获取当前用户信息的Hook -->
├── lib  <!-- 类似java里面的service层，逻辑上依赖data包 -->
│ ├── auth.ts  <!-- 认证相关的功能库 -->
│ ├── db.ts  <!-- 数据库操作库 -->
│ ├── mail.ts  <!-- 邮件相关的功能库 -->
│ ├── tokens.ts  <!-- 令牌相关的功能库 -->
│ └── utils.ts  <!-- 常用工具函数库 -->
├── middleware.ts  <!-- 中间件，处理一些全局请求逻辑，如认证检查 -->
├── next-auth.d.ts  <!-- NextAuth的类型定义文件 -->
├── next-env.d.ts  <!-- Next.js环境的类型定义文件 -->
├── next.config.ts  <!-- Next.js的配置文件 -->
├── package-lock.json  <!-- npm安装的依赖版本锁定文件 -->
├── package.json  <!-- npm项目配置文件，包含依赖、脚本等信息 -->
├── postcss.config.mjs  <!-- PostCSS配置文件 -->
├── prisma  <!-- Prisma相关文件，管理数据库模型 -->
│ └── schema.prisma  <!-- Prisma schema文件，定义数据库模型 -->
├── public  <!-- 存放静态资源，如图标、图片等 -->
│ ├── file.svg  <!-- 示例SVG文件 -->
│ ├── globe.svg  <!-- 全球图标 -->
│ ├── next.svg  <!-- Next.js相关图标 -->
│ ├── svgs  <!-- 存放其他SVG文件 -->
│ └── vercel.svg  <!-- Vercel图标 -->
├── tailwind.config.ts  <!-- Tailwind CSS配置文件 -->
├── tsconfig.json  <!-- TypeScript配置文件 -->
└── yarn.lock  <!-- yarn安装的依赖版本锁定文件 -->
```