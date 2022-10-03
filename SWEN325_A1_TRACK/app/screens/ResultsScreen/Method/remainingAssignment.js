//calculates incomplete assignments for a course
export default remainingAssignment = (courseResult) => {
  let assignmentRemaining = 100;
  courseResult.forEach((element) => {
    const completed = element.weight;
    assignmentRemaining = assignmentRemaining - completed;
  });
  return assignmentRemaining;
};
