import { costScore } from "./salaryEngine";
import { climateScore } from "./climateEngine";
import { airQualityScore } from "./airQualityEngine";

export function calculateLifeFitScore(city, profile) {
  const cost = costScore(profile.salary, city.rent);
  const climate = climateScore(city.avgTemp, city.humidity);
  const health = airQualityScore(city.airQuality);

  const totalWeight =
    profile.weights.cost +
    profile.weights.climate +
    profile.weights.health;

  const score =
    (cost * profile.weights.cost +
      climate * profile.weights.climate +
      health * profile.weights.health) /
    totalWeight;

  let explanation = "Balanced living conditions.";

  if (cost < climate && cost < health) explanation = "Affordable but lifestyle trade-offs.";
  if (health < cost && health < climate) explanation = "Health risks due to air quality.";
  if (climate < cost && climate < health) explanation = "Climate may cause discomfort.";

  return {
    score: Math.round(score),
    explanation
  };
}
