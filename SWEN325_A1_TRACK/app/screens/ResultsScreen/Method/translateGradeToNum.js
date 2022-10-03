//translates grade string to numeric value
export default translateGradeToNum = (value) => {
  if (value == "A+") {
    return 90;
  }
  if (value == "A") {
    return 85;
  }
  if (value == "A-") {
    return 80;
  }
  if (value == "B+") {
    return 75;
  }
  if (value == "B") {
    return 70;
  }
  if (value == "B-") {
    return 65;
  }
  if (value == "C+") {
    return 60;
  }
  if (value == "C") {
    return 55;
  }
  return 50;
};
