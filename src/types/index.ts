export interface Draw {
  id: string;
  number: number;
  date: string;
  time: string;
  players: string[];
  isWinner: boolean;
}

export interface DayDraws {
  date: string;
  draws: Draw[];
}