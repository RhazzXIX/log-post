import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GeneralLayout from "@/component/GeneralLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Log Post",
  description: "The front end client for my Blog-Post API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GeneralLayout>{children}</GeneralLayout>
      </body>
    </html>
  );
}
