import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — AI Engineer`,
  description:
    "I build intelligence from first principles — diffusion, alignment, multimodal — and ship it to production.",
  metadataBase: new URL("https://hasnainsohail.dev"),
  openGraph: {
    title: `${site.name} — AI Engineer`,
    description:
      "Generative · Multimodal · Agentic. Intelligence from first principles, shipped to production.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
