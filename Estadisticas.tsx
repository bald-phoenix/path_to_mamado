import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rutina · Tracker",
  description: "Bitácora diaria de entrenamiento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
