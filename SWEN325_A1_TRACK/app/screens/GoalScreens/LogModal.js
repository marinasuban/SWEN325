//Import general
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
  Alert,
} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";

//Import Style
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();
import colors from "../../assets/colors/colors";
import { Swipeable } from "react-native-gesture-handler";

//import method
import updateGoal from "./Method/updateGoal";
import deleteGoal from "./Method/deleteGoal";
import updateGoalProgress from "./Method/updateGoalProgress";
import rightActionsRemoveLog from "./Method/rightActionsRemoveLog";

export default class LogModal extends React.Component {
  //State of log object
  state = {
    logStrategyDate: "",
    newLog: "",
    newStrategy: "",
  };

  //confirm goal removed
  createConfirmation = () =>
    Alert.alert("Action", "This goal has been removed", [
      { text: "Dismiss", onPress: deleteGoal(this.props.goal) },
    ]);

  //add log to goal
  addLog = () => {
    let goal = this.props.goal;
    if (!goal.logs.some((log) => log.title === this.state.newLog)) {
      goal.logs.push({
        title: this.state.newLog,
        nextStrategy: this.state.newStrategy,
        logDateStrat: this.state.logStrategyDate,
      });
      updateGoal(goal);
    }
    this.setState({ newLog: "", newStrategy: "", logDate: "" });
    Keyboard.dismiss();
  };

  //set date of log and update last log in goal
  setDate = () => {
    let dateTime = new Date().toLocaleString();
    let date = new Date().toLocaleDateString();
    let goal = this.props.goal;
    goal.lastLog = date;
    this.setState({ logStrategyDate: dateTime });
  };

  //UI
  renderLog = (log, index) => {
    return (
      // Swipe right to remove log
      <Swipeable
        renderRightActions={(_, dragX) =>
          rightActionsRemoveLog(this.props.goal, dragX, index)
        }
      >
        {/* -----Container for each log and its content---- */}
        <View style={styles.logContainer}>
          {/* date */}
          <Text style={styles.logDate}>{log.logDateStrat}</Text>
          {/* current state of goal */}
          <Text style={styles.log}>Current Progress:</Text>
          <Text style={styles.logSub}>{log.title}</Text>
          {/* next step for goal */}
          <Text style={styles.log}>Next Step:</Text>
          <Text style={styles.logSub}>{log.nextStrategy}</Text>
        </View>
      </Swipeable>
    );
  };

  //UI
  render() {
    const goal = this.props.goal;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          {/* -----close pop-up----- */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.props.closeModal}
          >
            <MaterialCommunityIcons name="close" size={24} color={"black"} />
          </TouchableOpacity>

          {/* -----goal description----- */}
          <View style={[styles.section, styles.header]}>
            {/* title */}
            <View>
              <Text style={styles.title}>{goal.name}</Text>
            </View>
            {/* description */}
            <View style={{ height: 70 }}>
              <Text style={styles.description}>{goal.description}</Text>
            </View>
            {/* remove goal button */}
            <View style={styles.spacing}>
              <TouchableOpacity
                onPress={this.createConfirmation}
                style={styles.removeGoalButton}
              >
                <Text style={styles.removeGoalText}>Remove Goal</Text>
              </TouchableOpacity>
            </View>
            {/* goal state tab */}
            <View>
              <SegmentedControl
                selectedIndex={goal.progressIndex}
                values={["Inactive", "In-Progress", "Completed"]}
                onChange={(event) => {
                  updateGoalProgress(
                    goal,
                    event.nativeEvent.value,
                    event.nativeEvent.selectedSegmentIndex
                  );
                }}
                style={[styles.stateTab]}
              />
            </View>
          </View>

          {/*  -----List of past logs----- */}
          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={goal.logs}
              renderItem={({ item, index }) => this.renderLog(item, index)}
              keyExtractor={(item) => item.title}
              contentContainerStyle={styles.logContainer}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* ----Add log at bottom of screen----- */}
          <View
            style={[
              styles.section,
              styles.footer,
              { borderTopColor: goal.color },
            ]}
          >
            {/* current progress */}
            <View style={styles.spacing}>
              <TextInput
                style={[styles.input, { borderColor: goal.color }]}
                placeholder="Reflect On Current Progress..."
                onChangeText={(text) => this.setState({ newLog: text })}
                value={this.state.newLog}
              />
            </View>
            {/* next step */}
            <View style={styles.spacing}>
              <TextInput
                style={[styles.input, { borderColor: goal.color }]}
                placeholder="To Accelerate Progress My Next Step..."
                onChangeText={(text) => this.setState({ newStrategy: text })}
                value={this.state.newStrategy}
              />
            </View>
            {/* add log to goal */}
            <TouchableOpacity
              style={[styles.addLog, { backgroundColor: goal.color }]}
              onPress={() => {
                this.setDate();
                setTimeout(() => {
                  this.addLog();
                }, 1000);
              }}
            >
              <Text style={{ color: "white" }}> ADD LOG </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 10,
    marginVertical: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 10,
    width: 300,
  },
  footer: {
    paddingHorizontal: 32,
    alignItems: "center",
    borderTopWidth: 3,
    paddingTop: 15,
    marginBottom: 90,
  },
  input: {
    height: 50,
    width: 350,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  addLog: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  logContainer: {
    paddingVertical: 16,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  log: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
    paddingTop: 10,
  },
  description: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.black,
    marginRight: 10,
  },
  logSub: {
    color: colors.black,
    fontWeight: "400",
    fontSize: 14,
    marginBottom: 10,
  },
  logDate: {
    color: colors.black,
    fontWeight: "400",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  spacing: {
    paddingBottom: 10,
  },
  logContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  stateTab: {
    height: 30,
    width: 360,
    left: -5,
  },
  closeButton: {
    position: "absolute",
    top: 64,
    right: 32,
    zIndex: 10,
  },
  removeGoalButton: {
    backgroundColor: "#ba1e13",
    width: 130,
    height: 25,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  removeGoalText: {
    fontWeight: "600",
    color: "white",
    fontSize: 12,
  },
});
