//Import general
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";

//Import Style
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();
import colors from "../../assets/colors/colors";

//import methods
import addGoal from "./Method/addGoal";

export default class AddGoalModal extends React.Component {
  //Colour for goal board
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

  //confirm add goal alert
  createConfirmation = () => Alert.alert(
    "Confirm Action",
    "Are you sure want to add this goal?",
    [
      {
        text: "No",
        style: "cancel"
      },
      { text: "Yes", onPress: this.createGoal }
    ]
  );
  //State of goal object
  state = {
    name: "",
    description: "",
    progress: "Inactive",
    progressIndex: 0,
    color: this.backgroundColor[0],
  };

  //Create goal object and reset modal
  createGoal = () => {
    const { name, color, description, progress, progressIndex } = this.state;
    const goal = { name, color, description, progress, progressIndex };
    addGoal(goal);

    this.setState({
      name: "",
      description: "",
      progress: "Inactive",
      progressIndex: 0,
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
          <Text style={[styles.title, { color: this.state.color }]}>Create Goal</Text>
          {/* Select state of goal */}
          <Text style={styles.stateInputText}>Select state of goal:</Text>
          <SegmentedControl
            values={["Inactive", "In-Progress", "Completed"]}
            onChange={(event) => {
              this.setState({
                progress: event.nativeEvent.value,
                progressIndex: event.nativeEvent.selectedSegmentIndex,
              });
            }}
            style={styles.stateTab}
          />
          {/* Add title */}
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
            placeholder="Goal Title"
            onChangeText={(text) => this.setState({ name: text })}
          />
          {/* Add description */}
          <TextInput
            style={[styles.inputDescription, { borderColor: this.state.color }]}
            placeholder="Goal Description"
            onChangeText={(text) => this.setState({ description: text })}
            multiline={true}
            numberOfLines={4}
          />
          {/* Select color */}
          <View style={styles.colorContainer}>{this.renderColors()}</View>
          {/* Confirm action */}
          <TouchableOpacity
            style={[styles.createGoalTab, { backgroundColor: this.state.color }]}
            onPress={this.createConfirmation}
          >
            <Text style={styles.addGoalText}>ADD GOAL</Text>
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
    color: colors.darkBlue,
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
  createGoalTab: {
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
  stateInputText: {
    fontSize: 18,
    fontWeight: "500",
    color: "grey",
    alignSelf: "flex-start",
    marginBottom: 25,
  },
  inputDescription: {
    borderWidth: 1,
    borderRadius: 6,
    height: 150,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 10,
  },
  addGoalText: {
    color: "white",
    fontWeight: "600",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  stateTab: {
    height: 50,
    width: 330,
    top: -20,
    backgroundColor: "white",
    alignSelf: "center",
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
