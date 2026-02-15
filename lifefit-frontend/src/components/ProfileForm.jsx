import { useState, useEffect } from "react";

export default function ProfileForm({ onSubmit }) {
  const [salary, setSalary] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [open, setOpen] = useState(false);
const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/cities")
      .then(res => res.json())
      .then(data => setCities(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!salary || !familySize || !selectedCity) return;

    onSubmit({
      salary: Number(salary),
      familySize: Number(familySize),
      city: selectedCity
    });
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="number"
          placeholder="Monthly Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="modern-input"
        />

        <input
          type="number"
          placeholder="Family Size"
          value={familySize}
          onChange={(e) => setFamilySize(e.target.value)}
          className="modern-input"
        />

        <div className="custom-dropdown">
  <div
    className="dropdown-header"
    onClick={() => setOpen(!open)}
  >
    {selectedCity || "Select City"}
  </div>

  {open && (
    <div className="dropdown-menu">
      <input
        type="text"
        placeholder="Search city..."
        className="dropdown-search"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      <div className="dropdown-list">
        {cities
  .filter(city =>
    city.city.toLowerCase().includes(searchCity.toLowerCase())
  )
  .map(city => (

            <div
              key={city.id}
              className="dropdown-item"
              onClick={() => {
                setSelectedCity(city.city);
                setOpen(false);
                setSearchCity("");
              }}
            >
              {city.city}, {city.country}
            </div>
          ))}
      </div>
    </div>
  )}
</div>


        <button type="submit" className="modern-btn">
          Calculate
        </button>
      </div>
    </form>
  );
}
