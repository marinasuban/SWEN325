//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";
import { Vibration } from "react-native";

//Function used to update an assignment
export default deleteCourse = (course) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("courses")
    .doc(course.id)
    .delete();

  Vibration.vibrate();
};
