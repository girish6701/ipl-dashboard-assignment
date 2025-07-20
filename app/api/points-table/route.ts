import { type NextRequest, NextResponse } from "next/server";
import pointsTableData from "@/data/pointsTable.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year") || "2024";

    const validYears = ["2024", "2023", "2022"];
    if (!validYears.includes(year)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid year parameter. Valid years are: 2024, 2023, 2022",
        },
        { status: 400 }
      );
    }

    const pointsTable = pointsTableData[year as keyof typeof pointsTableData];

    const isCurrentSeason = year === "2024";
    const seasonInfo = {
      year,
      isCurrentSeason,
      totalTeams: pointsTable.length,
    };

    return NextResponse.json({
      success: true,
      data: {
        pointsTable,
        seasonInfo,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Points table API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
