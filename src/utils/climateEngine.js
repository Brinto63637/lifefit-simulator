export function climateScore(temp, humidity) {
  if (temp <= 30 && humidity <= 60) return 100;
  if (temp <= 35 && humidity <= 75) return 60;
  return 30;
}
