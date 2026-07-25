export function mutationRetryDelay(attempt: number, random = Math.random()) {
  const boundedAttempt = Math.max(0, Math.min(9, Math.trunc(attempt)));
  const base = Math.min(1_000, 35 * (2 ** boundedAttempt));
  return Math.round(base + Math.max(0, Math.min(1, random)) * Math.min(250, base));
}
