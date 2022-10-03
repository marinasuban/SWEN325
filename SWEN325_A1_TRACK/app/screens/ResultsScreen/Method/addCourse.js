//Import function
import { auth } from "../../../../firebaseSetup";
import { db } from "../../../../firebaseSetup";

//Function used to add an course
export default addCourse = (course) => {
  db.collection("users")
    .doc(auth.currentUser?.uid)
    .collection("courses")
    .add({
      courseName: course.courseName,
      trimester: course.trimester,
      year: course.year,
      color: course.color,
      desiredOutcome: course.desiredOutcome,
      desiredIndex: course.desiredIndex,
      results: [],
    })
    .catch((error) => alert(error.message));
};
