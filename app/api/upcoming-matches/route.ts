import { NextResponse } from "next/server";
import matchesData from "@/data/matches.json";

export async function GET() {
  try {
    const upcomingMatches = matchesData?.matches
      .filter((match) => match.status === "upcoming")
      .slice(0, 4);

    return NextResponse.json({
      success: true,
      data: {
        matches: upcomingMatches,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Upcoming matches API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
