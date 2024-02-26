"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
