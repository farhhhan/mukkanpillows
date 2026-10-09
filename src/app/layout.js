import { Nunito } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
const roundedFont = Nunito({ 
  subsets: ["latin"], 
  weight: ['400', '600', '700', '800'],
  variable: "--font-rounded" 
});

export const metadata = {
  title: "Mukkans Pillow | Sleep Re-engineered",
  description: "Premium ergonomic, memory foam, cooling, and plush microfiber pillows for every sleep style.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roundedFont.variable}`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
