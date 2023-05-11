import { getDifficultyColor } from '../lesson';

describe('getDifficultyColor lesson helper', () => {
  it('returns correct colors', () => {
    const easyColor = getDifficultyColor('easy');
    expect(easyColor).toBe('green.8');

    const mediumColor = getDifficultyColor('medium');
    expect(mediumColor).toBe('yellow.8');

    const hardColor = getDifficultyColor('hard');
    expect(hardColor).toBe('red.8');
  });
});
