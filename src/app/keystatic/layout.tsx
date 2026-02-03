// src/app/keystatic/layout.tsx
export const runtime = "edge";

import KeystaticApp from "./keystatic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <KeystaticApp />
      {children}
    </>
  );
}