//Import general
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

//Import screen
import ResultsModal from "./ResultModal";

//import method
import remainingAssignment from "./Method/remainingAssignment";
import currentGradeAvg from "./Method/currentGradeAvg";

export default class CourseObject extends Component {
  //State of course object
  state = {
    showCourseVisible: false,
  };

  //toggle screen visibility
  toggleCourseModal = () => {
    this.setState({ showCourseVisible: !this.state.showCourseVisible });
  };

  //Create course object and reset modal
  render() {
    //Const used to populate object
    const course = this.props.course;
    const courseRemaining = remainingAssignment(course.results);
    const gradeAvg = currentGradeAvg(course.results);


    //UI
    return (
      //Course object
      <View style={{ paddingBottom: 10 }}>
        {/* On click show results */}
        <Modal
          animationType="slide"
          visible={this.state.showCourseVisible}
          onRequestClose={this.toggleCourseModal}
        >
          <ResultsModal
            course={course}
            closeModal={this.toggleCourseModal}
          />
        </Modal>

        {/* -----Visual content of object------ */}
        <TouchableOpacity
          style={[styles.courseContainer, { backgroundColor: course.color }]}
          onPress={this.toggleCourseModal}
        >
          {/* header */}
          <Text style={styles.courseTitle} numberOfLines={1}>
            {course.courseName}
          </Text>
          {/* date */}
          <Text style={styles.description} numberOfLines={1}>
            Trimester {course.trimester}, {course.year}
          </Text>
          {/* course state */}
          <Text style={[styles.description, { paddingTop: 30,}]} numberOfLines={2}>
            The current grade average for this course is {gradeAvg}%.
          </Text>
          <Text style={[styles.description, { paddingTop: 10,}]} numberOfLines={1}>
            There is {courseRemaining}% of the course unaccounted for.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//Style of components
const styles = StyleSheet.create({
  courseContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "center",
    width: 370,
    height: 200,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0.5
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0.5
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0.5
  },
});
