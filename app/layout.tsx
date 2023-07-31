import "./globals.scss";
import Navbar from "@/components/Header/Navbar";
import { libre_caslon_text } from "@/styles/fonts";
import { NextAuthProvider } from "./providers";

export const metadata = {
  title: "Librería",
  description: "Librería generada con la API de libros openlibrary.org",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${libre_caslon_text.className}`}>
      <body>
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
      </body>
    </html>
  );
}
