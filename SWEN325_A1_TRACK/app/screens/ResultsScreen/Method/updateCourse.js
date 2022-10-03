//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";

//Function used to update a course 
export default updateCourse = (course) => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("courses")
      .doc(course.id)
      .update(course);
  };