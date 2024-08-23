import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/theme-context";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIMRIK",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)
  console.log(session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContextProvider>
          <SessionProvider session={session}>
            {!session ? (
              <Login/>
            ): (
              <div className="flex">
              <div className="h-screen overflow-y-auto md:min-w-[20rem]">
                <Sidebar/>
              </div>

              <div className="flex-1">
                {children}
              </div>
            </div>

            )}
          </SessionProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
