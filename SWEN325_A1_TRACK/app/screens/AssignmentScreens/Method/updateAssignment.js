//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";

//Function used to update an assignment in the db
export default updateAssignment = (assignment) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("lists")
    .doc(assignment.id)
    .update(assignment);
};
