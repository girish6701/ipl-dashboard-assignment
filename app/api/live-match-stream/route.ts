import { NextResponse } from "next/server";
import type { LiveMatchState, BallOutcome } from "@/types";

export const dynamic = "force-dynamic";

let matchState: LiveMatchState = {
  team1: {
    id: "CSK",
    name: "Chennai Super Kings",
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
  },
  team2: {
    id: "MI",
    name: "Mumbai Indians",
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
  },
  currentBatting: "CSK",
  currentBowling: "MI",
  matchStatus: "live",
  currentBall: 0,
  lastBallResult: "",
  commentary: "",
};

let lastUpdateTime = Date.now();
const BALL_INTERVAL = 5000;

const outcomes: BallOutcome[] = [
  { type: "runs", value: 1 },
  { type: "runs", value: 2 },
  { type: "runs", value: 3 },
  { type: "runs", value: 4 },
  { type: "runs", value: 6 },
  { type: "wicket", value: 0 },
  { type: "dot", value: 0 },
];

function getRandomOutcome(): BallOutcome {
  let random = Math.floor(Math.random() * 7);
  return outcomes[random];
}

function simulateBall(): void {
  if (matchState.matchStatus === "completed") return;

  const battingTeam =
    matchState.currentBatting === "CSK" ? matchState.team1 : matchState.team2;
  const outcome = getRandomOutcome();

  matchState.currentBall++;

  if (outcome.type === "wicket") {
    battingTeam.wickets++;
    matchState.lastBallResult = "WICKET!";
  } else if (outcome.type === "runs") {
    battingTeam.score += outcome.value;
    matchState.lastBallResult = outcome.value.toString();
  } else {
    matchState.lastBallResult = "0";
  }

  battingTeam.balls++;
  if (battingTeam.balls === 6) {
    battingTeam.overs++;
    battingTeam.balls = 0;
  }

  if (battingTeam.overs >= 3 || battingTeam.wickets >= 10) {
    if (matchState.currentBatting === "CSK") {
      matchState.currentBatting = "MI";
      matchState.currentBowling = "CSK";
    } else {
      matchState.matchStatus = "completed";
    }
  }

  lastUpdateTime = Date.now();
}

export async function GET() {
  try {
    const now = Date.now();
    if (
      now - lastUpdateTime >= BALL_INTERVAL &&
      matchState.matchStatus === "live"
    ) {
      simulateBall();
    }

    return NextResponse.json({
      success: true,
      data: matchState,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Live match API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
