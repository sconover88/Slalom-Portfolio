import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

export const outfit = Outfit({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
