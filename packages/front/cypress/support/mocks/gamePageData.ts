import { GameStage } from '../constants';

export const gameFooterMessages = {
  [GameStage.Success]: [
    'Great job! Language skills shining!',
    'Impressive work! Mastering language!',
    "You've got it! Keep learning!",
    'Well done! Proficiency rising!',
    'Fantastic effort! Flourishing skills!',
    'Keep it up! Language virtuoso!',
    'Incredible job! Remarkable grasp!',
    'Nailed it! Inspiring progress!',
    'Outstanding! Unmatched aptitude!',
    'Acing it! Commendable dedication!'
  ],
  [GameStage.Error]: [
    "Keep going, you're making progress!",
    "Mistakes are stepping stones to success. Don't give up!",
    "You've got this! Keep practicing!",
    'Learning is a journey. Keep pushing forward!',
    'Embrace challenges to learn and grow!',
    "Believe in yourself! You'll master it.",
    "Keep at it, and you'll see results!",
    "You're getting there! Keep practicing!",
    'Progress comes from perseverance!',
    "Stay positive! You've got this!"
  ],
  [GameStage.Initial]: ["Let's get started"]
};
