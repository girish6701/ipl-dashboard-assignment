import { NextResponse } from "next/server";
import teamsData from "@/data/teams.json";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: teamsData.teams,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Teams API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
