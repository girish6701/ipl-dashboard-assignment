import type {
  PointsTableApiResponse,
  UpcomingMatchesApiResponse,
  MatchesApiResponse,
} from "@/types/api";
import type { Team } from "@/types";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000/";

export function getTeamById(id: string, teams: Team[]) {
  return teams?.find((team) => team.id === id);
}

export async function getPointsTable(
  year: string
): Promise<PointsTableApiResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/points-table?year=${year}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching points table:", error);
    throw error;
  }
}

export async function getUpcomingMatches(): Promise<UpcomingMatchesApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/upcoming-matches`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching upcoming matches:", error);
    throw error;
  }
}

export async function getMatches(): Promise<MatchesApiResponse> {
  try {
    const url = `${API_BASE_URL}/api/matches-data`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
}

export async function getTeams(): Promise<Team[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/teams`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}
