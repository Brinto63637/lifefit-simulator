import { salaryVerdict } from "../utils/salaryEngine";

export default function DecisionCard({ city, profile }) {
  const verdict = salaryVerdict(profile.salary, city.rent);

  return (
    <div className="card">
      <h3>Decision</h3>
      <p>City: {city.name}</p>
      <p>Status: {verdict}</p>
    </div>
  );
}
