//import method
import updateGoal from "./updateGoal"

//update progress of goal from within log modal
export default updateGoalProgress = (goal, value, valueIndex) => {
  goal.progress = value;
  goal.progressIndex = valueIndex;

  updateGoal(goal);
};
