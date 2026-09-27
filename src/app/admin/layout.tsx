import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Bookings",
  description: "Token-gated bookings dashboard for Brendy Clean Services staff.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main id="main">{children}</main>;
}
