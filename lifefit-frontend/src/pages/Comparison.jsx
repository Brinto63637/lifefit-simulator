import { useEffect, useState } from "react";
import { calculateLifeFitScore } from "../utils/lifeFitEngine";

export default function Comparison() {
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [search, setSearch] = useState("");
  const [salary, setSalary] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cities")
      .then(res => res.json())
      .then(data => setCities(data));
  }, []);

  const toggleCity = (cityName) => {
    if (selectedCities.includes(cityName)) {
      setSelectedCities(selectedCities.filter(c => c !== cityName));
    } else {
      setSelectedCities([...selectedCities, cityName]);
    }
  };

  const handleCompare = () => {
    if (!salary || !familySize || selectedCities.length === 0) return;

    const profile = {
      salary: Number(salary),
      familySize: Number(familySize)
    };

    const filtered = cities.filter(city =>
      selectedCities.includes(city.city)
    );

    const calculated = filtered.map(city => {
      const result = calculateLifeFitScore(city, profile);
      return { ...city, ...result };
    });

    const ranked = [...calculated].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return parseFloat(b.savingsPercent) - parseFloat(a.savingsPercent);
    });

    setResults(ranked);
  };

  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="content-card">

        <h1>🏙 City Comparison</h1>

        {/* Step 1 */}
<div className="section-block">
  <div className="section-header">
    <span className="section-number">1</span>
    <h3>Enter Your Details</h3>
  </div>

  <div className="modern-input-row">
    <div className="input-group">
      <label>Monthly Salary (USD)</label>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="e.g. 3000"
      />
    </div>

    <div className="input-group">
      <label>Family Size</label>
      <input
        type="number"
        value={familySize}
        onChange={(e) => setFamilySize(e.target.value)}
        placeholder="e.g. 2"
      />
    </div>
  </div>
</div>

{/* Step 2 */}
<div className="section-block">
  <div className="section-header">
    <span className="section-number">2</span>
    <h3>Select Cities</h3>
  </div>

  <div className="search-wrapper">
    <input
      type="text"
      placeholder="Search cities..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="city-grid">
    {filteredCities.map(city => {
      const isSelected = selectedCities.includes(city.city);

      return (
        <div
          key={city.id}
          className={`city-option ${isSelected ? "selected" : ""}`}
          onClick={() => toggleCity(city.city)}
        >
          <div>
            <h4>{city.city}</h4>
            <p>{city.country}</p>
          </div>

          {isSelected && <span className="checkmark">✓</span>}
        </div>
      );
    })}
  </div>

  <div className="selection-footer">
    <span>
      Selected Cities: <strong>{selectedCities.length}</strong>
    </span>

    <button
      className="primary-btn"
      disabled={!salary || !familySize || selectedCities.length === 0}
      onClick={handleCompare}
    >
      Compare Selected Cities
    </button>
  </div>
</div>


        {/* Step 3 */}
        {results.length > 0 && (
          <>
            <h3 style={{ marginTop: "30px" }}>
              Step 3: View Results
            </h3>

            <div className="results-grid">
              {results.map((city, index) => (
                <div
                  key={city.id}
                  className={`city-card ${index === 0 ? "best" : ""}`}
                >
                  <h3>
                    {index === 0 && (
                      <span className="best-badge">
                        BEST
                      </span>
                    )}
                    {city.city}, {city.country}
                  </h3>

                  <p><strong>Total Expense:</strong> ${city.totalExpense}</p>
                  <p><strong>Disposable Income:</strong> ${city.disposableIncome}</p>
                  <p><strong>Savings %:</strong> {city.savingsPercent}%</p>

                  {/* Savings Visual Bar */}
                  <div className="savings-bar">
                    <div
                      className="savings-fill"
                      style={{ width: `${city.savingsPercent}%` }}
                    />
                  </div>

                  <p><strong>Affordability:</strong> {city.affordability}</p>
                  <p><strong>LifeFit Score:</strong> {city.score}</p>

                  {index === 0 && (
                    <p style={{ color: "green" }}>
                      ✅ Highest savings percentage and overall score.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
