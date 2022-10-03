//import method
import updateCourse from "./updateCourse";

//update desired outcome of course from within
export default updateCourseProgress = (course, value, valueIndex) => {
  course.desiredOutcome = value;
  course.desiredIndex = valueIndex;

  updateCourse(course);
};
