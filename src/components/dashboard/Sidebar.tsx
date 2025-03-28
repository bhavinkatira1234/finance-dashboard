"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Target, Grid } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
      <div className="text-2xl font-bold mb-8">Finance</div>
      <nav>
        <ul>
          <li>
            <Link className={`flex py-2 px-4 my-2 hover:bg-gray-700 rounded ${pathname === "/dashboard" ? "bg-gray-600" : ""}`} href="/dashboard">
              <Grid className="mr-2 w-6 h-6" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link className={`flex py-2 px-4 my-2 hover:bg-gray-700 rounded ${pathname === "/transactions" ? "bg-gray-600" : ""}`} href="/transactions">
              <CreditCard className="mr-2 w-6 h-6" />
              Transactions
            </Link>
          </li>
          <li>
            <Link className={`flex py-2 px-4 my-2 hover:bg-gray-700 rounded ${pathname === "/savings-goals" ? "bg-gray-600" : ""}`} href="/savings-goals">
              <Target className="mr-2 w-6 h-6" />
              Savings Goals
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
