//returns background color selected for assignment
export default getBackgroundColor = (index, assignment) => {
    if (assignment.tasks[index].inProgress == true) {
      return "orange";
    } else if (assignment.tasks[index].completed == true) {
      return "green";
    }
    return "red";
  };