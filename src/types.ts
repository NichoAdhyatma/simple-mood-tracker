export type Mood = {
  id: string;
  date: Date;
  rating: number;
  note: string;
  tags: string[];
};

export type MoodRating = {
  value: number;
  label: string;
  color: string;
  icon: string;
};