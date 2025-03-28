import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Personal Finance Dashboard",
  description: "Track your income, expenses, and savings goals",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <header className="bg-white shadow-md p-4 flex items-center justify-between sm:hidden">
          <div className="text-lg font-bold">Personal Finance</div>
          <button className="text-gray-700 sm:hidden">
            <span className="material-icons">menu</span>
          </button>
        </header> */}

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
