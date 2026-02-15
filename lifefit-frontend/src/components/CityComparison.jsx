import { useEffect, useState } from "react";
import { calculateLifeFitScore } from "../utils/lifeFitEngine";

export default function CityComparison({ profile }) {
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    if (!profile.city) return;

    fetch(`http://localhost:5000/api/cities/${profile.city}`)
      .then((res) => res.json())
      .then((data) => setCityData(data));
  }, [profile.city]);

  if (!cityData) return null;

  const result = calculateLifeFitScore(cityData, profile);

  return (
    <div>
      <h2>City Result</h2>

      <h3>{cityData.city}, {cityData.country}</h3>

      <p>Total Expense: ${result.totalExpense}</p>
      <p>Disposable Income: ${result.disposableIncome}</p>
      <p>Affordability: {result.affordability}</p>
      <p>LifeFit Score: {result.score}</p>
    </div>
  );
}
