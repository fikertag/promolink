import { Inter } from "next/font/google"; // ✅ Import Inter and keep Geist_Mono
import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
