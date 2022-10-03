//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";
import { Vibration } from "react-native";

//Function used to delete an assignment
export default deleteGoal = (goal) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("goals")
    .doc(goal.id)
    .delete();

  Vibration.vibrate();
};
