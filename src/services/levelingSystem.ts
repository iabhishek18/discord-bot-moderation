const XP_PER_MESSAGE = 15;
const XP_COOLDOWN_MS = 60000;
const BASE_XP_PER_LEVEL = 100;
const XP_MULTIPLIER = 1.5;

const cooldowns = new Map<string, number>();

export function calculateXpForLevel(level: number): number {
  return Math.floor(BASE_XP_PER_LEVEL * Math.pow(XP_MULTIPLIER, level - 1));
}

export function calculateLevelFromXp(totalXp: number): { level: number; currentXp: number; requiredXp: number; progress: number } {
  let level = 1;
  let remainingXp = totalXp;
  while (remainingXp >= calculateXpForLevel(level)) {
    remainingXp -= calculateXpForLevel(level);
    level++;
  }
  const required = calculateXpForLevel(level);
  return { level, currentXp: remainingXp, requiredXp: required, progress: (remainingXp / required) * 100 };
}

export function shouldGrantXp(userId: string, guildId: string): boolean {
  const key = `${guildId}:${userId}`;
  const lastGrant = cooldowns.get(key) ?? 0;
  if (Date.now() - lastGrant < XP_COOLDOWN_MS) return false;
  cooldowns.set(key, Date.now());
  return true;
}

export function getXpGrant(): number {
  return XP_PER_MESSAGE + Math.floor(Math.random() * 10);
}

export function getLeaderboardRank(userXp: number, allXps: number[]): number {
  const sorted = [...allXps].sort((a, b) => b - a);
  return sorted.indexOf(userXp) + 1;
}
