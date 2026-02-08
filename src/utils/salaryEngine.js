export function salaryVerdict(salary, rent) {
  const remaining = salary - rent;

  if (remaining >= salary * 0.4) return "Survive";
  if (remaining >= salary * 0.2) return "Struggle";
  return "Risky";
}

export function costScore(salary, rent) {
  const ratio = rent / salary;
  if (ratio < 0.3) return 100;
  if (ratio < 0.5) return 60;
  return 30;
}
