import { useState } from "react";

export default function CitySearch({ onSelectCity }) {
  const [name, setName] = useState("");

  function analyzeCity() {
    if (!name) return;

    onSelectCity({
      name,
      rent: 15000,
      avgTemp: 34,
      humidity: 65,
      airQuality: 130,
      internet: 80
    });
  }

  return (
    <div className="card">
      <h3>City</h3>
      <input
        placeholder="Enter city name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={analyzeCity}>Analyze</button>
    </div>
  );
}
