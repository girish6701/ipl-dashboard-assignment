import type React from "react";
import { UpcomingMatches } from "./upcoming-matches";
import type { Team } from "@/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  upcomingMatches: any[];
  teams: Team[];
}

export function DashboardLayout({
  children,
  upcomingMatches,
  teams,
}: DashboardLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-96 flex-shrink-0">
        <div>
          <UpcomingMatches matches={upcomingMatches} teams={teams} />
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
