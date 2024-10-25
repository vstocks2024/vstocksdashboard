import "jsvectormap/dist/jsvectormap.min.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "../globals.css";
import React from "react";

import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";
import { AdminAuthContextProvider }  from "@/context/AdminAuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AdminAuthContextProvider>
        {children}
        <Toaster />
        </AdminAuthContextProvider>
      </body>
    </html>
  );
}
