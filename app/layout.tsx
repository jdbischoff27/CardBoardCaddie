import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Cardboard Caddie — Hassle-Free Cardboard Pickup",
  description:
    "Schedule a pickup of your cardboard boxes and let Cardboard Caddie handle the rest. Monthly subscriptions or one-time pickups available.",
  keywords: "cardboard pickup, recycling, box removal, subscription recycling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
