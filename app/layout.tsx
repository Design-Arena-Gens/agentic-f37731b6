import type { Metadata } from "next";
import "./globals.css";
import { Inter, Work_Sans, IBM_Plex_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-display"
});

const plexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "CV Forge 2025 | 40 Plantillas de Curriculum",
  description:
    "Colección de 40 plantillas de currículum 2025 listos para personalizar, exportar e inspirar."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${workSans.variable} ${plexMono.variable}`}>
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
