//set filter value to field
export default translateStringToField = (order) => {
    if (order == "Trimester") {
      return "trimester";
    }
    if (order == "Year") {
      return "year";
    }
    return "courseName";
  };
