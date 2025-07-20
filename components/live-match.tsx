"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import type { Team, LiveMatchState } from "@/types";
import { getTeamById } from "@/lib/server-api";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/";

interface LiveMatchApiResponse {
  success: boolean;
  data?: LiveMatchState;
  error?: string;
  timestamp: string;
}

interface LiveMatchProps {
  teams: Team[];
}

export function LiveMatch({ teams }: LiveMatchProps) {
  const [matchState, setMatchState] = useState<LiveMatchState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/live-match-stream`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: LiveMatchApiResponse = await response.json();

        if (result.success && result.data) {
          setMatchState(result.data);
          setIsLoading(false);

          if (result.data.matchStatus === "completed") {
            setIsPolling(false);
          }
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        console.error("Error fetching match data:", err);
        setIsLoading(false);
      }
    };

    fetchMatchData();

    let intervalId: NodeJS.Timeout | null = null;

    if (isPolling) {
      intervalId = setInterval(fetchMatchData, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPolling]);

  if (isLoading || !matchState) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 mb-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-green-700 font-medium">
            Loading live match...
          </span>
        </div>
      </div>
    );
  }

  const team1 = getTeamById(matchState.team1.id, teams);
  const team2 = getTeamById(matchState.team2.id, teams);

  const formatOvers = (overs: number, balls: number) => {
    return balls === 0 ? `${overs}.0` : `${overs}.${balls}`;
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Play className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  isPolling ? "bg-green-500" : "bg-gray-500"
                }`}
              ></div>
              <span className={isPolling ? "text-green-600" : "text-gray-600"}>
                {matchState?.matchStatus === "live" ? "LIVE" : "COMPLETED"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {matchState.lastBallResult && (
            <div className="text-right">
              <div className="text-sm text-gray-600">Last Ball</div>
              <div
                className={`text-2xl font-bold ${
                  matchState.lastBallResult === "WICKET!"
                    ? "text-red-600"
                    : matchState.lastBallResult === "6"
                    ? "text-green-600"
                    : matchState.lastBallResult === "4"
                    ? "text-blue-600"
                    : "text-gray-900"
                }`}
              >
                {matchState.lastBallResult}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div
          className={`p-4 rounded-lg border-2 ${
            matchState.currentBatting === matchState.team1.id
              ? "bg-white border-green-300 shadow-md"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={team1?.logo}
                alt={team1?.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-gray-900">
                  {team1?.shortName}
                </div>
                <div className="text-sm text-gray-600">{team1?.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {matchState.team1.score}/{matchState.team1.wickets}
              </div>
              <div className="text-sm text-gray-600">
                {formatOvers(matchState.team1.overs, matchState.team1.balls)}{" "}
                overs
              </div>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg border-2 ${
            matchState.currentBatting === matchState.team2.id
              ? "bg-white border-green-300 shadow-md"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={team2?.logo}
                alt={team2?.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-gray-900">
                  {team2?.shortName}
                </div>
                <div className="text-sm text-gray-600">{team2?.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {matchState.team2.score}/{matchState.team2.wickets}
              </div>
              <div className="text-sm text-gray-600">
                {formatOvers(matchState.team2.overs, matchState.team2.balls)}{" "}
                overs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
