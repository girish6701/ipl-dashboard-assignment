import { NextResponse } from "next/server";
import matchesData from "@/data/matches.json";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        matches: matchesData?.matches,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Matches API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
