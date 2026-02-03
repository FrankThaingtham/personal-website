// src/app/keystatic/layout.tsx
export const runtime = "edge";

import type { ReactNode } from "react";
import KeystaticApp from "./keystatic";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <KeystaticApp />
        {children}
      </body>
    </html>
  );
}