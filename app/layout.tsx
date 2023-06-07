import { Providers } from "@/store/provider";
import "./globals.scss";
import Navbar from "@/components/Header/Navbar";
import { Suspense   } from "react";
import Loading from "./loading";
import { libre_caslon_text } from "@/styles/fonts";

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
    <html
      lang="en"
      className={`${libre_caslon_text.className}`}
    >
      <body>
        <Providers>
          <Navbar />
          {/* <Suspense fallback={<Loading />}>
            {children}
            </Suspense> */}
            {children}
        </Providers>
      </body>
    </html>
  );
}
