import moment from "moment";

const calculateBMR = (gender, weight, height, age) => {
  let bmr;
  if (gender === "male") {
    bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
  } else if (gender === "female") {
    bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  }
  return bmr;
};

const calculateAge = (birthDate) => {
  return moment().diff(moment(birthDate, "YYYY-MM-DD"), "years");
};

const calculateNutritionPerDay = (tdee) => {
  const breakfastCalories = tdee * 0.25;
  const lunchCalories = tdee * 0.35;
  const dinnerCalories = tdee * 0.3;
  // Tính toán chỉ số dinh dưỡng cho cả ngày
  const nutritionPerDay = {
    protein:
      (breakfastCalories * 0.15) / 4 +
      (lunchCalories * 0.2) / 4 +
      (dinnerCalories * 0.2) / 4,
    fat:
      (breakfastCalories * 0.25) / 9 +
      (lunchCalories * 0.3) / 9 +
      (dinnerCalories * 0.3) / 9,
    carbohydrat:
      (breakfastCalories * 0.6) / 4 +
      (lunchCalories * 0.5) / 4 +
      (dinnerCalories * 0.5) / 4,
    fiber: 10 + 15 + 10,
  };

  return nutritionPerDay;
};

export { calculateBMR, calculateAge, calculateNutritionPerDay };
