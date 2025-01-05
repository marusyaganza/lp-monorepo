import { Score } from '../../../../generated/graphql';
import { SpacedRepetitionData } from '../../../schema/Word';
import { updateSpacedRepetitionFields } from '../spacedRepetition';

describe('updateSpacedRepetitionFields', () => {
  let baseWordData: SpacedRepetitionData;
  let now: Date;

  beforeEach(() => {
    now = new Date('2025-01-01T12:00:00Z');
    jest.useFakeTimers().setSystemTime(now);

    baseWordData = {
      isNewCard: true,
      currentInterval: 0,
      nextReviewDate: new Date(),
      reviewHistory: [],
      learningSteps: [1, 10],
      currentStep: 0,
      ease: 2.5,
      lapses: 0
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle new card with Again score', () => {
    const result = updateSpacedRepetitionFields(baseWordData, Score.Again);
    expect(result.isNewCard).toBe(true);
    expect(result.currentStep).toBe(0);
    expect(result.lapses).toBe(1);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 20 * 60 * 1000)
    );
  });

  it('should handle new card with Hard score', () => {
    const result = updateSpacedRepetitionFields(baseWordData, Score.Hard);
    expect(result.isNewCard).toBe(false);
    expect(result.currentInterval).toBe(18);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000)
    );
  });

  it('should handle new card with Good score (first step)', () => {
    const result = updateSpacedRepetitionFields(baseWordData, Score.Good);
    expect(result.isNewCard).toBe(true);
    expect(result.currentStep).toBe(1);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 10 * 60 * 1000)
    );
  });

  it('should handle new card with Good score (graduating)', () => {
    baseWordData.currentStep = 1;
    const result = updateSpacedRepetitionFields(baseWordData, Score.Good);
    expect(result.isNewCard).toBe(false);
    expect(result.currentInterval).toBe(15);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000)
    );
  });

  it('should handle new card with Easy score', () => {
    const result = updateSpacedRepetitionFields(baseWordData, Score.Easy);
    expect(result.isNewCard).toBe(false);
    expect(result.currentInterval).toBe(30);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    );
  });

  it('should handle review card with Again score', () => {
    baseWordData.isNewCard = false;
    baseWordData.currentInterval = 10;
    const result = updateSpacedRepetitionFields(baseWordData, Score.Again);
    expect(result.lapses).toBe(1);
    expect(result.currentInterval).toBe(7);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 20 * 60 * 1000)
    );
    expect(result.ease).toBe(2.3);
  });

  it('should handle review card with Hard score', () => {
    baseWordData.isNewCard = false;
    baseWordData.currentInterval = 10;
    const result = updateSpacedRepetitionFields(baseWordData, Score.Hard);
    expect(result.currentInterval).toBe(12);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000)
    );
    expect(result.ease).toBe(2.35);
  });

  it('should handle review card with Good score', () => {
    baseWordData.isNewCard = false;
    baseWordData.currentInterval = 10;
    const result = updateSpacedRepetitionFields(baseWordData, Score.Good);
    expect(result.currentInterval).toBe(25);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000)
    );
    expect(result.ease).toBe(2.5);
  });

  it('should handle review card with Easy score', () => {
    baseWordData.isNewCard = false;
    baseWordData.currentInterval = 10;
    const result = updateSpacedRepetitionFields(baseWordData, Score.Easy);
    expect(result.currentInterval).toBe(32.5);
    expect(result.nextReviewDate).toEqual(
      new Date(now.getTime() + 32.5 * 24 * 60 * 60 * 1000)
    );
    expect(result.ease).toBe(2.5);
  });

  it('should apply maximum interval constraint', () => {
    baseWordData.isNewCard = false;
    baseWordData.currentInterval = 80;
    const result = updateSpacedRepetitionFields(baseWordData, Score.Good);
    expect(result.currentInterval).toBe(90);
  });

  it('should add review to history', () => {
    const result = updateSpacedRepetitionFields(baseWordData, Score.Good);
    expect(result.reviewHistory).toHaveLength(1);
    expect(result.reviewHistory[0]).toEqual({
      date: now,
      grade: Score.Good,
      interval: 0
    });
  });
});
