import { Score } from '../../../generated/graphql';
import { SpacedRepetitionData } from '../../schema/Word';

export function initializeSpacedRepetitionFields(): SpacedRepetitionData {
  // Convert learning steps from string to minutes
  const learningStepsInMinutes = [15, 1440, 8640]; // 15m, 1d, 6d converted to minutes

  const now = new Date();

  return {
    // Core tracking
    isNewCard: true,
    currentInterval: 1,
    nextReviewDate: now,

    // Learning progress
    reviewHistory: [],
    learningSteps: learningStepsInMinutes,
    currentStep: 0,
    ease: 2.5,
    lapses: 0
  };
}

export function updateSpacedRepetitionFields(
  wordData: SpacedRepetitionData,
  grade: Score
): SpacedRepetitionData {
  const now = new Date();
  const newData = { ...wordData };

  // Add review to history
  newData.reviewHistory.push({
    date: now,
    grade: grade,
    interval: newData.currentInterval
  });

  // Handle new cards
  if (newData.isNewCard) {
    switch (grade) {
      case Score.Again:
        newData.currentStep = 0;
        newData.lapses += 1;
        newData.nextReviewDate = new Date(now.getTime() + 20 * 60 * 1000); // 20m relearning step
        break;
      case Score.Hard:
        newData.currentInterval = 15 * 1.2; // graduating * hard interval
        newData.isNewCard = false;
        newData.nextReviewDate = new Date(
          now.getTime() + newData.currentInterval * 24 * 60 * 60 * 1000
        );
        break;
      case Score.Good:
        if (newData.currentStep < newData.learningSteps.length - 1) {
          newData.currentStep += 1;
          const nextStepMinutes = newData.learningSteps[newData.currentStep];
          newData.nextReviewDate = new Date(
            now.getTime() + nextStepMinutes * 60 * 1000
          );
        } else {
          newData.currentInterval = 15; // graduating interval
          newData.isNewCard = false;
          newData.nextReviewDate = new Date(
            now.getTime() + newData.currentInterval * 24 * 60 * 60 * 1000
          );
        }
        break;
      case Score.Easy:
        newData.currentInterval = 30; // easy interval
        newData.isNewCard = false;
        newData.nextReviewDate = new Date(
          now.getTime() + newData.currentInterval * 24 * 60 * 60 * 1000
        );
        break;
    }
  }
  // Handle review cards
  else {
    switch (grade) {
      case Score.Again:
        newData.lapses += 1;
        newData.currentInterval = Math.max(2, newData.currentInterval * 0.7); // minimum interval vs new interval
        newData.nextReviewDate = new Date(now.getTime() + 20 * 60 * 1000); // 20m relearning step
        break;
      case Score.Hard:
        newData.currentInterval *= 1.2; // hard interval
        break;
      case Score.Good:
        newData.currentInterval *= 1.0 * 2.5; // interval modifier * starting ease
        break;
      case Score.Easy:
        newData.currentInterval *= 1.0 * 2.5 * 1.3; // interval modifier * starting ease * easy bonus
        break;
    }

    if (grade !== Score.Again) {
      // Apply maximum interval constraint
      newData.currentInterval = Math.min(newData.currentInterval, 90);
      newData.nextReviewDate = new Date(
        now.getTime() + newData.currentInterval * 24 * 60 * 60 * 1000
      );
    }
  }

  // Update ease factor based on performance
  if (!newData.isNewCard) {
    if (grade === Score.Again) newData.ease = Math.max(1.3, newData.ease - 0.2);
    if (grade === Score.Hard) newData.ease = Math.max(1.3, newData.ease - 0.15);
    if (grade === Score.Easy) newData.ease = Math.min(2.5, newData.ease + 0.15);
  }

  return newData;
}
