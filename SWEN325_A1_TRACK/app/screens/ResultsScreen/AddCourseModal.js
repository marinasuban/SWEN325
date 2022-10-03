//Import general
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";

//Import Style
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/colors/colors";
MaterialCommunityIcons.loadFont();

//import method
import addCourse from "./Method/addCourse";

export default class AddCourseModal extends Component {
  //Colour for course board
  backgroundColor = [
    "#15456f",
    "#1d8299",
    "#1d998d",
    "#23b8b0",
    "#451d8a",
    "#711d8a",
    "#b82a8f",
    "#cf066a",
  ];

  createConfirmation = () =>
    Alert.alert("Confirm Action", "Are you sure want to add this course?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: this.createCourse },
    ]);

  //State of course object
  state = {
    courseName: "",
    trimester: "",
    year: "",
    desiredOutcome: "A+",
    desiredIndex: 0,
    color: this.backgroundColor[0],
  };

  //Create course object and reset modal
  createCourse = () => {
    const { courseName, trimester, year, desiredOutcome, desiredIndex, color } =
      this.state;
    const course = {
      courseName,
      trimester,
      year,
      color,
      desiredIndex,
      desiredOutcome,
    };
    addCourse(course);
    this.setState({
      courseName: "",
      trimester: "",
      year: "",
      desiredOutcome: "A+",
      desiredIndex: 0,
    });
    this.props.closeModal();
  };

  //Sets/preview color of course object
  renderColors() {
    return this.backgroundColor.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  //UI
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.closeModal}
        >
          <MaterialCommunityIcons name="close" size={24} color={"black"} />
        </TouchableOpacity>

        {/* -----Inputs----- */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={Keyboard.dismiss}
        >
          {/* title */}
          <Text style={[styles.title, { color: this.state.color }]}>
            Create Course
          </Text>
          {/* select desired course outcome bar */}
          <Text style={styles.outcomeText}>
            Select desired course outcome:
          </Text>
          <SegmentedControl
            values={["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-"]}
            onChange={(event) => {
              this.setState({
                desiredOutcome: event.nativeEvent.value,
                desiredIndex: event.nativeEvent.selectedSegmentIndex,
              });
            }}
            style={styles.outcomeTab}
          />
          {/* course name */}
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Course title"
            onChangeText={(text) => this.setState({ courseName: text })}
          />
          {/* course trimester */}
          <TextInput
            keyboardType="numeric"
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Trimester Course Held"
            onChangeText={(text) => this.setState({ trimester: text })}
          />
          {/* course year */}
          <TextInput
            keyboardType="numeric"
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Year Course Held"
            onChangeText={(text) => this.setState({ year: text })}
          />
          {/* select course color */}
          <View style={styles.colorPicker}>{this.renderColors()}</View>
          {/* create course button */}
          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createConfirmation}
          >
            <Text style={styles.addCourseText}>ADD COURSE</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

//Style of components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    alignSelf: "flex-start",
    marginBottom: 16,
    width: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutralBlue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  addCourseText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
    alignSelf: "center",
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  datePicker: {
    height: 50,
    marginTop: 8,
    fontSize: 18,
    width: 325,
  },
  colorPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 20,
    width: 325,
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 64,
    right: 32,
  },
  inputContainer: {
    alignSelf: "stretch",
    marginHorizontal: 32,
  },
  outcomeTab: {
    height: 50,
    width: 330,
    top: -20,
    backgroundColor: "white",
    alignSelf: "center",
  },
  outcomeText: {
    fontSize: 18,
    fontWeight: "500",
    color: "grey",
    alignSelf: "flex-start",
    marginBottom: 25,
  },
});
