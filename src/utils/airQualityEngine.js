export function airQualityScore(aqi) {
  if (aqi <= 50) return 100;
  if (aqi <= 100) return 70;
  if (aqi <= 150) return 40;
  return 20;
}
