//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";

//Function used to add a goal to db
export default addGoal = (goal) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("goals")
    .add({
      name: goal.name,
      description: goal.description,
      progress: goal.progress,
      progressIndex: goal.progressIndex,
      lastLog: "",
      color: goal.color,
      logs: [],
    })
    .catch((error) => alert(error.message));
};
