import { UserStats } from '../types';

export interface LessonLabProps {
  userStats: UserStats;
  onCompleteLesson: (lessonId: string, xp: number, mundri: number) => void;
  className?: string;
}
