import { Libre_Caslon_Text, Montserrat } from "next/font/google";

export const libre_caslon_text = Libre_Caslon_Text({
  weight: ["400", "700"],
  display: "swap",
  variable: '--font-libre',
  subsets: ["latin-ext"]
});

export const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: '--font-montserrat',
  subsets: ["latin"]
});
