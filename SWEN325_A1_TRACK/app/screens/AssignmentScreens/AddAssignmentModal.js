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
import DatePicker from "react-native-datepicker";

//Import Style
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/colors/colors";
MaterialCommunityIcons.loadFont();

//Import methods
import addAssignment from "./Method/addAssignment";

export default class AddAssignmentModal extends Component {
  //Colour for assignment board
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

  //Create confirmation pop-up box
  createConfirmation = () =>
    Alert.alert("Confirm Action", "Are you sure want to add this assignment?", [
      {
        text: "No",
        style: "cancel",
      },
      { text: "Yes", onPress: this.createAssignment },
    ]);

  //State of assignment object
  state = {
    course: "",
    name: "",
    dueDate: "",
    percentage: "",
    color: this.backgroundColor[0],
  };

  //Create assignment object and reset modal
  createAssignment = () => {
    const { course, name, dueDate, percentage, color } = this.state;
    const assignment = { course, name, dueDate, percentage, color };
    addAssignment(assignment);
    this.setState({
      course: "",
      name: "",
      dueDate: "",
      percentage: "",
    });
    this.props.closeModal();
  };

  //Sets/preview color of assignment object
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
        {/* -----Close button----- */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.closeModal}
        >
          <MaterialCommunityIcons name="close" size={24} color={"black"} />
        </TouchableOpacity>

        {/* ----Inputs---- */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={Keyboard.dismiss}
        >
          {/* Add assignment title */}
          <Text style={[styles.title, { color: this.state.color }]}>
            Create Assignment
          </Text>
          {/* course name input */}
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Course title"
            onChangeText={(text) => this.setState({ course: text })}
          />
          {/* assignment name input */}
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Assignment title"
            onChangeText={(text) => this.setState({ name: text })}
          />
          {/* due-date input */}
          <DatePicker
            style={styles.datePicker}
            mode="date"
            date={this.state.dueDate}
            placeholder="Select Assignment Due-Date"
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({ dueDate: date });
            }}
          />
          {/* object color */}
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Course Percentage"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ percentage: text })}
          />
          <View style={styles.colorPicker}>{this.renderColors()}</View>
          {/* Add assignment button invokes confirmation pop-up */}
          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createConfirmation}
          >
            <Text style={styles.addBoardText}>ADD ASSIGNMENT</Text>
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
    color: colors.darkBlue,
    alignSelf: "flex-start",
    marginBottom: 16,
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
  addBoardText: {
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
});
