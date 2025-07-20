import { Clock, MapPin, Trophy, Play } from "lucide-react";
import type { Team } from "@/types";
import Image from "next/image";
import { getTeamById } from "@/lib/server-api";

interface MatchScheduleProps {
  matches: any[];
  teams: Team[];
}

export function MatchSchedule({ matches, teams }: MatchScheduleProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      year: date.getFullYear(),
    };
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Play,
      },
      completed: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: Trophy,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const color = config?.color;
    const Icon = config?.icon;

    return (
      <span
        className={`flex items-center gap-1 px-1 sm:px-3 py-1 rounded-full text-xs font-medium border ${color}`}
      >
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {matches?.map((match) => {
          const team1 = getTeamById(match?.team1, teams);
          const team2 = getTeamById(match?.team2, teams);
          const dateInfo = formatDate(match?.date);
          const isCompleted = match?.status === "completed";
          const isUpcoming = match?.status === "upcoming";

          return (
            <div
              key={match?.id}
              className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
                isUpcoming
                  ? "bg-gradient-to-r from-blue-50 to-white border-blue-100 hover:border-blue-200"
                  : "bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <span
                    className={`flex items-center px-1 sm:px-3 py-1 rounded-full text-sm font-medium ${
                      isUpcoming
                        ? "bg-blue-600 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    Match {match?.matchNumber}
                  </span>
                  {getStatusBadge(match?.status)}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    {dateInfo?.day}
                  </div>
                  <div className="text-sm text-gray-600">
                    {dateInfo?.month} {dateInfo?.year}
                  </div>
                  <div className="text-xs text-gray-500">
                    {dateInfo?.weekday}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-4">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{match?.venue}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 items-center">
                <div className="lg:col-span-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={team1?.logo}
                          alt={team1?.name}
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                        {isCompleted &&
                          match?.result &&
                          match?.result?.winner === team1?.id && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <Trophy className="h-3 w-3 text-white" />
                            </div>
                          )}
                      </div>
                      <div>
                        <div
                          className={`font-bold ${
                            isCompleted &&
                            match?.result &&
                            match?.result?.winner === team1?.id
                              ? "text-green-600"
                              : "text-gray-900"
                          }`}
                        >
                          {team1?.shortName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {team1?.name}
                        </div>
                      </div>
                    </div>
                    {isCompleted && match?.result?.team1Score && (
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {match?.result?.team1Score?.runs}/
                          {match?.result?.team1Score?.wickets}{" "}
                          {match?.result?.team1Score?.overs}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 text-center">
                  <div className="text-xl font-bold text-gray-400 mb-1">
                    V/S
                  </div>
                  <div
                    className={`flex items-center justify-center gap-1 text-sm rounded-lg px-1 sm:px-3 py-1 ${
                      isUpcoming
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 bg-gray-100"
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    {match?.time}
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={team2?.logo}
                          alt={team2?.name}
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                        {isCompleted &&
                          match?.result &&
                          match?.result?.winner === team2?.id && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <Trophy className="h-3 w-3 text-white" />
                            </div>
                          )}
                      </div>
                      <div>
                        <div
                          className={`font-bold ${
                            isCompleted &&
                            match.result &&
                            match.result.winner === team2?.id
                              ? "text-green-600"
                              : "text-gray-900"
                          }`}
                        >
                          {team2?.shortName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {team2?.name}
                        </div>
                      </div>
                    </div>
                    {isCompleted && match?.result?.team2Score && (
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {match?.result?.team2Score?.runs}/
                          {match?.result?.team2Score?.wickets}{" "}
                          {match?.result?.team2Score?.overs}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isCompleted && match?.result && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-800 mb-1">
                      {getTeamById(match?.result?.winner, teams)?.shortName} won
                      by {match?.result?.margin}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                      Man of the Match: {match?.result?.manOfMatch}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
