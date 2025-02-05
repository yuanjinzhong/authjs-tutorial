import React from "react";
import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    // bg-gradient-to-tr 从左下到右上开启颜色渐变  from-gray-400 左下颜色（灰色） to-pink-400 右上颜色（粉色）
    <div className="flex flex-col  min-h-screen items-center justify-center bg-gradient-to-tr from-gray-400 to-pink-400">
      {/*space-y-6 距离上面元素1.5rem(1rem=16px),距离下面元素1.5rem*/}
      <div className=" space-y-6 text-center">
        <h1 className=" flex items-baseline justify-center  text-white text-6xl font-semibold drop-shadow-md">
          🔒&nbsp;Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton asChild mode={"modal"}>
            <Button variant={"secondary"} size={"lg"}>
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Page;
