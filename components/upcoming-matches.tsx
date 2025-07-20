import { Clock } from "lucide-react";
import type { Team } from "@/types";
import Image from "next/image";
import { getTeamById } from "@/lib/server-api";

interface UpcomingMatchesProps {
  matches: any[];
  teams: Team[];
}

export function UpcomingMatches({ matches, teams }: UpcomingMatchesProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="px-6 py-4 text-xl font-bold text-gray-900 flex items-center gap-3">
        Upcoming Matches
      </h2>

      <div className="px-6 py-4">
        <div className="space-y-4">
          {matches?.map((match) => {
            const team1 = getTeamById(match?.team1, teams);
            const team2 = getTeamById(match?.team2, teams);
            const dateInfo = formatDate(match?.date);

            return (
              <div
                key={match?.id}
                className="rounded-xl p-4 border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    Match {match?.matchNumber}
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 font-medium">
                      {dateInfo?.day}
                    </div>
                    <div className="text-xs text-gray-500">
                      {dateInfo?.month}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={team1?.logo}
                      alt={team1?.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <div className="font-bold text-gray-900 text-sm">
                      {team1?.shortName}
                    </div>
                  </div>

                  <div className="text-lg font-bold text-gray-400">V/S</div>

                  <div className="flex items-center gap-2">
                    <div className="font-bold text-gray-900 text-sm">
                      {team2?.shortName}
                    </div>
                    <Image
                      src={team2?.logo}
                      alt={team2?.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 text-sm text-blue-600 bg-blue-50 rounded-lg px-3 py-1">
                  <Clock className="h-4 w-4" />
                  {match?.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
