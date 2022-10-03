//Import general
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";

//Import Style
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();

//import method
import updateCourse from "./Method/updateCourse";

export default class AddResultModal extends React.Component {
  //State of goal object
  state = {
    name: "",
    overallWeight: "",
    outcomeValue: "",
  };

  //Create goal object and reset modal
  addResult = () => {
    let course = this.props.course;
    if (!course.results.some((result) => result.title === this.state.name)) {
      course.results.push({
        title: this.state.name,
        weight: this.state.overallWeight,
        outcome: this.state.outcomeValue,
      });
      updateCourse(course);
    }
    this.setState({ name: "", overallWeight: "", outcomeValue: "" });
    this.props.closeModal();
  };

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
        <TouchableOpacity style={styles.inputContainer} onPress={Keyboard.dismiss}>
          {/* header */}
          <Text style={[styles.title , { color: this.props.course.color}]}>ADD RESULT</Text>
          {/* Add title */}
          <TextInput
            style={[styles.input, { borderColor: this.props.course.color}]}
            placeholder="Assignment Name"
            onChangeText={(text) => this.setState({ name: text })}
          />
          {/* weight */}
          <TextInput
            style={[styles.input, { borderColor: this.props.course.color}]}
            placeholder="Assignment Weight %"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ overallWeight: text })}
          />
          {/* result */}
          <TextInput
            style={[styles.input, { borderColor: this.props.course.color}]}
            placeholder="Assignment Result %"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ outcomeValue: text })}
          />
            {/* Confirm action */}
          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.props.course.color}]}
            onPress={this.addResult}
          >
            <Text style={styles.addGoalText}>ADD RESULT</Text>
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
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 6,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 10,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    color: "black"
  },
  addGoalText: {
    color: "white",
    fontWeight: "600",
  },
  inputContainer: {
    alignSelf: "stretch",
    marginHorizontal: 32,
  },
  closeButton: {
    position: "absolute",
    top: 64,
    right: 32,
  },
});
