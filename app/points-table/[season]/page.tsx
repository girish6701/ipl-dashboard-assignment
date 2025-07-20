import { DashboardLayout } from "@/components/dashboard-layout";
import { PointsTable } from "@/components/points-table";
import { notFound } from "next/navigation";
import { getPointsTable, getTeams, getUpcomingMatches } from "@/lib/server-api";

interface PointsTablePageProps {
  params: Promise<{
    season: string;
  }>;
}

export default async function PointsTableSeasonPage({
  params,
}: PointsTablePageProps) {
  const { season } = await params;
  const validSeasons = ["2024", "2023", "2022"];

  if (!validSeasons.includes(season)) {
    return notFound();
  }

  try {
    const [pointsTableData, teams, upcomingMatchesData] = await Promise.all([
      getPointsTable(season),
      getTeams(),
      getUpcomingMatches(),
    ]);

    return (
      <DashboardLayout
        upcomingMatches={upcomingMatchesData?.matches}
        teams={teams}
      >
        <PointsTable
          pointsTable={pointsTableData?.pointsTable}
          seasonInfo={pointsTableData?.seasonInfo}
          teams={teams}
          currentSeason={season}
        />
      </DashboardLayout>
    );
  } catch (error) {
    console.error("Error loading points table page:", error);
    return notFound();
  }
}

// export async function generateStaticParams() {
//   return [{ season: "2024" }, { season: "2023" }, { season: "2022" }];
// }
