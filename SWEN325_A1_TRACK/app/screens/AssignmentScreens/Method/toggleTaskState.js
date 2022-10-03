
//Import methods
import updateAssignment from "./updateAssignment";

export default toggleTaskState = (assignment, index, todoState, inProgressState, CompletedState) => {
    assignment.tasks[index].completed = CompletedState;
    assignment.tasks[index].inProgress = inProgressState;
    assignment.tasks[index].todo = todoState;
    updateAssignment(assignment);
  };