import { DashboardLayout } from "@/components/dashboard-layout";
import { MatchSchedule } from "@/components/match-schedule";
import { LiveMatch } from "@/components/live-match";
import { getMatches, getTeams, getUpcomingMatches } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export default async function MatchesPage() {
  try {
    const [matchesData, teams, upcomingMatchesData] = await Promise.all([
      getMatches(),
      getTeams(),
      getUpcomingMatches(),
    ]);

    return (
      <DashboardLayout
        upcomingMatches={upcomingMatchesData?.matches}
        teams={teams}
      >
        <div>
          <LiveMatch teams={teams} />

          <MatchSchedule matches={matchesData?.matches} teams={teams} />
        </div>
      </DashboardLayout>
    );
  } catch (error) {
    console.error("Error loading matches page:", error);
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-2">Error loading matches</div>
          <div className="text-gray-400 text-sm">Please try again later</div>
        </div>
      </div>
    );
  }
}
