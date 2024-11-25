import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Mejora el rendimiento de carga de fuentes
});

export const metadata: Metadata = {
  title: "Wake on LAN by Roberto Gallardo",
  description: "A web application to wake your PC using Wake on LAN, developed by Roberto Gallardo",
  viewport: "width=device-width, initial-scale=1", // Configuración recomendada para dispositivos móviles
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}