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

export { calculateBMR, calculateAge };
