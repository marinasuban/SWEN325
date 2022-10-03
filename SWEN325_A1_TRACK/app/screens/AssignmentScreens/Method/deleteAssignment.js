//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";
import { Vibration } from "react-native";

//Function used to delete an assignment in db
export default deleteAssignment = (assignment) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("lists")
    .doc(assignment.id)
    .delete();

  Vibration.vibrate();
};
