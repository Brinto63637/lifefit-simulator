import { useState } from "react";

export default function ProfileForm({ onSubmitProfile }) {
  const [salary, setSalary] = useState(30000);
  const [cost, setCost] = useState(40);
  const [climate, setClimate] = useState(30);
  const [health, setHealth] = useState(30);

  function submit() {
    onSubmitProfile({
      salary,
      weights: {
        cost,
        climate,
        health
      }
    });
  }

  return (
    <div className="card">
      <h3>Your Profile</h3>

      <p>Salary</p>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
      />

      <p>Priorities (total 100)</p>
      <input type="number" value={cost} onChange={(e) => setCost(+e.target.value)} /> Cost
      <br />
      <input type="number" value={climate} onChange={(e) => setClimate(+e.target.value)} /> Climate
      <br />
      <input type="number" value={health} onChange={(e) => setHealth(+e.target.value)} /> Health

      <br /><br />
      <button onClick={submit}>Simulate</button>
    </div>
  );
}
