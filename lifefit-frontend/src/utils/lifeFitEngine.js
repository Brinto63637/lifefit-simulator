export function calculateLifeFitScore(city, profile) {

  // 🔥 Rent scaling based on family size
  let rent;
  
  if (profile.familySize <= 2) {
    rent = Number(city.rent_1_outside || 0);
  } else {
    rent = Number(city.rent_3_outside || 1);
  }

  const utilities = Number(city.utilities || 0);

  // 🔥 Grocery monthly conversion (correct)
  const groceryCost =
    Number(city.grocery_index || 0) *
    120 *
    profile.familySize;

  const transportCost =
    Number(city.transport_index || 0);

  const totalExpense =
    rent + utilities + groceryCost + transportCost;

  const disposableIncome =
    profile.salary - totalExpense;

  // 🔥 Better scoring model (more realistic)
  const savingsRatio = disposableIncome / profile.salary;

  let affordability;
let score;

if (savingsRatio >= 0.4) {
  affordability = "Affordable";
  score = 100;
} 
else if (savingsRatio >= 0.25) {
  affordability = "Comfortable";
  score = 80;
} 
else if (savingsRatio >= 0.15) {
  affordability = "Moderately Affordable";
  score = 65;
} 
else if (savingsRatio >= 0.05) {
  affordability = "Financially Tight";
  score = 45;
} 
else if (savingsRatio > 0) {
  affordability = "Very Tight";
  score = 30;
} 
else {
  affordability = "Financially Risky";
  score = 10;
}
const savingsPercent = (savingsRatio * 100).toFixed(1);


  return {
  totalExpense: totalExpense.toFixed(2),
  disposableIncome: disposableIncome.toFixed(2),
  savingsPercent,
  affordability,
  score
};

}
