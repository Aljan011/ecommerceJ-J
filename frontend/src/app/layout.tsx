"use client";
import "./globals.css";
import { AppProvider } from "@/providers";
import { LogoutButton } from "@/components";
import TopNavBar from "@/components/MenuBar/TopNavBar";
import FooterSection from "@/components/MenuBar/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        <AppProvider>
          < TopNavBar />
          <LogoutButton />
          {children}
          <FooterSection />
        </AppProvider>
      </body>
    </html>
  );
}
