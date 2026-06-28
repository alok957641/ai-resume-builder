import type  { Resume } from '../types';

export interface ScoreResult {
  total: number;
  breakdown: { label: string; score: number; max: number; tip: string }[];
  grade: 'A' | 'B' | 'C' | 'D';
}

export const calculateScore = (resume: Resume): ScoreResult => {
  const { personalInfo: p, experience, education, skills } = resume;
  const breakdown = [];

  // Personal Info — 25 points
  let personalScore = 0;
  if (p.fullName?.trim()) personalScore += 5;
  if (p.email?.trim()) personalScore += 5;
  if (p.phone?.trim()) personalScore += 5;
  if (p.summary?.trim() && p.summary.length > 50) personalScore += 5;
  if (p.linkedin?.trim()) personalScore += 3;
  if (p.github?.trim()) personalScore += 2;
  breakdown.push({
    label: '👤 Personal Info',
    score: personalScore,
    max: 25,
    tip: personalScore < 25 ? 'LinkedIn aur GitHub add karo!' : 'Perfect! ✅',
  });

  // Experience — 35 points
  let expScore = 0;
  if (experience.length > 0) expScore += 10;
  if (experience.length > 1) expScore += 5;
  const hasDesc = experience.some(e => e.description?.length > 50);
  if (hasDesc) expScore += 15;
  const hasDates = experience.every(e => e.startDate);
  if (hasDates) expScore += 5;
  breakdown.push({
    label: '💼 Experience',
    score: expScore,
    max: 35,
    tip: expScore < 35 ? 'AI se descriptions improve karo!' : 'Bahut acha! ✅',
  });

  // Education — 20 points
  let eduScore = 0;
  if (education.length > 0) eduScore += 10;
  if (education[0]?.degree?.trim()) eduScore += 5;
  if (education[0]?.grade?.trim()) eduScore += 5;
  breakdown.push({
    label: '🎓 Education',
    score: eduScore,
    max: 20,
    tip: eduScore < 20 ? 'Grade aur degree complete karo!' : 'Complete! ✅',
  });

  // Skills — 20 points
  let skillScore = 0;
  if (skills.length >= 3) skillScore += 5;
  if (skills.length >= 6) skillScore += 5;
  if (skills.length >= 10) skillScore += 5;
  const hasExpert = skills.some(s => s.level === 'expert');
  if (hasExpert) skillScore += 5;
  breakdown.push({
    label: '🛠️ Skills',
    score: skillScore,
    max: 20,
    tip: skillScore < 20 ? `${10 - skills.length} aur skills add karo!` : 'Great! ✅',
  });

  const total = breakdown.reduce((sum, b) => sum + b.score, 0);
  const grade = total >= 85 ? 'A' : total >= 70 ? 'B' : total >= 50 ? 'C' : 'D';

  return { total, breakdown, grade };
};