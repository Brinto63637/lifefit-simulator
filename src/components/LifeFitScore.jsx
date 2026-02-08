import { calculateLifeFitScore } from "../utils/scoreEngine";

export default function LifeFitScore({ city, profile }) {
  const result = calculateLifeFitScore(city, profile);

  return (
    <div className="card">
      <h3>LifeFit Score</h3>
      <h2>{result.score} / 100</h2>
      <p>{result.explanation}</p>
    </div>
  );
}
