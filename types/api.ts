export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PointsTableApiResponse {
  pointsTable: any[];
  seasonInfo: {
    year: string;
    isCurrentSeason: boolean;
  };
}

export interface UpcomingMatchesApiResponse {
  matches: any[];
  metadata: {
    totalUpcomingMatches: number;
    nextMatchDate: string | null;
    displayedMatches: number;
  };
}

export interface MatchesApiResponse {
  matches: any[];
}
