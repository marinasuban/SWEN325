//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";

//Function used to update a goal in the db
export default updateGoal = (goal) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("goals")
    .doc(goal.id)
    .update(goal);
};
