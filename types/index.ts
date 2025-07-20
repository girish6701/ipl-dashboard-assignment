import { StaticImport } from "next/dist/shared/lib/get-img-props"

export interface Team {
  id: string
  name: string | StaticImport
  shortName: string
  logo: string | StaticImport
}

export interface TeamScore {
  runs: number
  wickets: number
  overs: number
}

export interface MatchResult {
  winner: string
  margin: string
  manOfMatch: string
  team1Score?: TeamScore
  team2Score?: TeamScore
}

export interface Match {
  id: string
  team1: string
  team2: string
  date: string
  time: string
  venue: string
  status: "upcoming" | "live" | "completed"
  matchNumber: number
  result?: MatchResult
}

export interface PointsTableEntry {
  teamId: string
  position: number
  matchesPlayed: number
  wins: number
  losses: number
  ties: number
  points: number
  nrr: string
  recentForm: string[]
}

export interface TeamsData {
  teams: Team[]
}

export interface MatchesData {
  matches: Match[]
}

export interface PointsTableData {
  pointsTable: PointsTableEntry[]
}

// Live match types
export interface LiveTeamState {
  id: string
  name: string
  score: number
  wickets: number
  overs: number
  balls: number
}

export interface LiveMatchState {
  team1: LiveTeamState
  team2: LiveTeamState
  currentBatting: string
  currentBowling: string
  matchStatus: "live" | "completed"
  currentBall: number
  lastBallResult: string
  commentary: string
}

export interface BallOutcome {
  type: "runs" | "wicket" | "dot"
  value: number
}
