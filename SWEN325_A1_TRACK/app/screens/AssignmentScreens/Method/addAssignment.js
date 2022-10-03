//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";

//Function used to add an assignment to db
export default addAssignment = (assignment) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("lists")
    .add({
      course: assignment.course,
      name: assignment.name,
      dueDate: assignment.dueDate,
      percentage: assignment.percentage,
      color: assignment.color,
      tasks: [],
    })
    .catch((error) => alert(error.message));
};
