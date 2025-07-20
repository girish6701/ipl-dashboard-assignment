"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Trophy, Calendar } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/points-table/2024",
      label: "Points Table",
      icon: Trophy,
      isActive: pathname.startsWith("/points-table"),
    },
    {
      href: "/matches",
      label: "All Matches",
      icon: Calendar,
      isActive: pathname === "/matches",
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 py-2">
        <div className="flex items-center justify-between min-h-16 flex-wrap gap-y-4">
          <Link href="/">
            <div className="p-2 rounded-lg bg-blue-600">
              <Image
                alt="Logo"
                width={166}
                height={83}
                className="w-20"
                src="https://documents.iplt20.com//ipl/assets/images/ipl-logo-new-old.png"
              />
            </div>
          </Link>

          <div className="flex items-center gap-x-3">
            {navItems?.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item?.label}
                  href={item?.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    item?.isActive
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item?.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
