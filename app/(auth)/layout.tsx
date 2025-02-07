import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col  min-h-screen items-center justify-center bg-gradient-to-tr from-gray-400 to-pink-400">
      {children}
    </div>
  );
}

export default Layout;
