//Import general
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Modal,
  Alert,
} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";

//Import Style
import colors from "../../assets/colors/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();
import { Swipeable } from "react-native-gesture-handler";

//import screen
import AddResultModal from "./AddResultModal";

//import method
import deleteCourse from "./Method/deleteCourse";
import remainingAssignment from "./Method/remainingAssignment";
import rightActionRemoveResult from "./Method/rightActionRemoveResult";
import updateCourseProgress from "./Method/updateCourseProgress";
import requiredResult from "./Method/requiredResult";

export default class ResultModal extends Component {
  //State of result object
  state = {
    addResultVisible: false,
  };

  //confirm course removed
  createConfirmation = () =>
    Alert.alert("Action", "This course has been removed", [
      { text: "Dismiss", onPress: deleteCourse(this.props.course) },
    ]);

  //Toggle add course screen display
  toggleAddResultModal = () => {
    this.setState({ addResultVisible: !this.state.addResultVisible });
  };

  //Result object
  renderResult = (result, index) => {
    return (
      // Swipe right to remove result
      <Swipeable
        renderRightActions={(_, dragX) =>
          rightActionRemoveResult(this.props.course, dragX, index)
        }
      >
        {/* Container for each result */}
        <View style={styles.assignmentResultContainer}>
          {/* result header */}
          <Text style={styles.result}>{result.title}</Text>
          <Text style={styles.resultDescription}>
            Overall Weight of Assignment: {result.weight}%
          </Text>
          <Text style={styles.resultDescription}>
            Result of Assignment: {result.outcome}%
          </Text>
        </View>
      </Swipeable>
    );
  };

  //Modal holding result
  render() {
    //Value to populate modal
    const course = this.props.course;
    const assignmentRemaining = remainingAssignment(course.results);
    const requiredPercentage = requiredResult(course);

    return (
      <View style={styles.container}>
        {/* close pop-up */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.closeModal}
        >
          <MaterialCommunityIcons name="close" size={24} color={"black"} />
        </TouchableOpacity>

        {/* add result screen visible when button pressed */}
        <Modal
          animationType="slide"
          visible={this.state.addResultVisible}
          onRequestClose={this.toggleAddResultModal}
        >
          <AddResultModal
            closeModal={this.toggleAddResultModal}
            course={this.props.course}
          />
        </Modal>
        {/* -----assigment description----- */}
        <View style={[styles.section, styles.header]}>
          <View>
            {/* header */}
            <Text style={styles.title}>{course.courseName}</Text>
            {/* date */}
            <Text style={styles.dateDescription}>
              Trimester {course.trimester}, ({course.year})
            </Text>
            {/* outcome tab */}
            <View>
              <Text>Select desired outcome for course:</Text>
              <SegmentedControl
                selectedIndex={course.desiredIndex}
                values={["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-"]}
                style={styles.outcomeBar}
                onChange={(event) => {
                  updateCourseProgress(
                    course,
                    event.nativeEvent.value,
                    event.nativeEvent.selectedSegmentIndex
                  );
                }}
              />
            </View>
            {/* add result button */}
            <View style={{ paddingTop: 10, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={this.toggleAddResultModal}
                style={[
                  { backgroundColor: course.color },
                  styles.addResultButton,
                ]}
              >
                <Text style={styles.headerButtonText}>Record Result</Text>
              </TouchableOpacity>
              {/* delete course button */}
              <TouchableOpacity
                onPress={this.createConfirmation}
                style={styles.deleteCourseButton}
              >
                <Text style={styles.headerButtonText}>Remove Course</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*  -----List of current result----- */}
        <View style={[styles.section, { flex: 3, marginVertical: 40 }]}>
          <FlatList
            data={course.results}
            renderItem={({ item, index }) => this.renderResult(item, index)}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Calculation result at bottom of screen */}
        <View style={[styles.section, styles.footer]}>
          <View style={[{ borderColor: course.color }, styles.resultContainer]}>
            <Text style={styles.summaryTitle}>
              To Achieved The Desired Grade Outcome of {course.desiredOutcome}:
            </Text>
            <Text style={styles.summaryDescription}>
              The User Must Achieve a result of at least {requiredPercentage}%
            </Text>
            <Text style={styles.summaryDescription}>
              In the remaining {assignmentRemaining}% of assignments in the
              course{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

//Style of components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  footer: {
    paddingHorizontal: 32,
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingBottom: 40,
  },
  assignmentResultContainer: {
    paddingVertical: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 32,
  },
  result: {
    color: "Black",
    fontWeight: "700",
    fontSize: 22,
  },
  resultDescription: {
    color: "Black",
    fontWeight: "400",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: 64,
    right: 32,
    zIndex: 10,
  },
  dateDescription: {
    marginTop: 4,
    marginBottom: 30,
    color: colors.gray,
    fontWeight: "600",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    paddingBottom: 10,
  },
  summaryDescription: {
    fontSize: 14,
    fontWeight: "600",
  },
  outcomeBar: {
    height: 30,
    left: -5,
    width: 360,
  },
  addResultButton: {
    height: 50,
    left: -5,
    width: 170,
    borderRadius: 10,
  },
  headerButtonText: {
    paddingVertical: 15,
    alignSelf: "center",
    fontWeight: "500",
    color: "white",
  },
  deleteCourseButton: {
    backgroundColor: "#ba1e13",
    width: 170,
    height: 50,
    borderRadius: 10,
    left: 10,
    alignItems: "center",
  },
  resultContainer: {
    borderWidth: 2,
    width: 350,
    alignSelf: "center",
    height: 160,
    borderRadius: 10,
    padding: 20,
  },
});
