"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import type { Team } from "@/types";
import Image from "next/image";
import { getTeamById } from "@/lib/server-api";

interface PointsTableProps {
  pointsTable: any[];
  seasonInfo: any;
  teams: Team[];
  currentSeason: string;
}

export function PointsTable({
  pointsTable,
  seasonInfo,
  teams,
  currentSeason,
}: PointsTableProps) {
  const router = useRouter();
  const seasons = ["2024", "2023", "2022"];
  const isCurrentSeason = seasonInfo?.isCurrentSeason;

  const isHistoricalWinner = (entry: any) =>
    !isCurrentSeason && entry?.isWinner;

  const handleSeasonChange = (season: string) => {
    router.push(`/points-table/${season}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Points Table
          </h2>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={currentSeason}
              onChange={(e) => handleSeasonChange(e?.target?.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg bg-white font-medium text-gray-900 min-w-[140px]"
            >
              {seasons?.map((season) => (
                <option key={season} value={season}>
                  IPL {season}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-gray-600">
          {isCurrentSeason
            ? "Current Tournament Standings"
            : `IPL ${currentSeason} Final Standings`}
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="space-y-3 min-w-[700px]">
          {pointsTable?.map((entry) => {
            const team = getTeamById(entry?.teamId, teams);
            const isWinner = isHistoricalWinner(entry);

            return (
              <div
                key={entry?.teamId}
                className={`rounded-lg p-4 border transition-all duration-200 hover:shadow-md ${
                  isWinner
                    ? "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300 shadow-md"
                    : "bg-gradient-to-r from-gray-50 to-white border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border ${
                        isWinner
                          ? "text-yellow-800 bg-yellow-200 border-yellow-400"
                          : "text-gray-600 bg-gray-50 border-gray-200"
                      }`}
                    >
                      {entry.position}
                    </div>
                    <Image
                      src={team?.logo}
                      alt={team?.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <div className="flex items-center gap-2">
                      <div>
                        <div
                          className={`font-bold ${
                            isWinner ? "text-yellow-800" : "text-gray-900"
                          }`}
                        >
                          {team?.shortName}
                        </div>
                        <div className="text-sm text-gray-600 hidden sm:block">
                          {team?.name}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">M</div>
                      <div className="font-medium">{entry?.matchesPlayed}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">W</div>
                      <div className="font-medium text-green-600">
                        {entry?.wins}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">L</div>
                      <div className="font-medium text-red-600">
                        {entry?.losses}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">Pts</div>
                      <div className="font-bold text-gray-900">
                        {entry?.points}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">NRR</div>
                      <div
                        className={`font-medium flex items-center gap-1 ${
                          entry?.nrr?.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {entry?.nrr}
                      </div>
                    </div>
                    <div className="text-center ml-8">
                      <div className="text-gray-500 text-xs mb-1">
                        Recent Form
                      </div>
                      <div className="flex gap-1">
                        {entry?.recentForm?.map(
                          (result: string, index: number) => (
                            <div
                              key={`${index}+${result}`}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                result === "W" ? "bg-green-500" : "bg-red-500"
                              }`}
                            >
                              {result}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
