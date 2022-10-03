//function used to translate key to recognised fields
export default translateStringtoField = (order) => {
    if (order == "Course") {
      return "course";
    }
    if (order == "Due-date") {
      return "dueDate";
    }
    if (order == "Weight") {
      return "percentage";
    }
    return "name";
  };