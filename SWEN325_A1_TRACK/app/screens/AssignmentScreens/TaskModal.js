//Import general
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Alert
} from "react-native";

//Import Style
import colors from "../../assets/colors/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();
import { Swipeable } from "react-native-gesture-handler";

//Import methods
import updateAssignment from "./Method/updateAssignment";
import deleteAssignment from "./Method/deleteAssignment";
import rightActionsRemoveTask from "./Method/rightActionsRemoveTask";
import getBackgroundColor from "./Method/getBackgroundColor";
import toggleTaskState from "./Method/toggleTaskState";

export default class TaskModal extends Component {
  //State of task object
  state = {
    newTask: "",
  };

  //Confirms assignment deleted
  createConfirmation = () => Alert.alert(
    "Action",
    "This assignment has been removed",
    [
      { text: "Dismiss", onPress: deleteAssignment(this.props.assignment) }
    ]
  );

  //add task to assignment
  addTask = () => {
    let assignment = this.props.assignment;
    if (!assignment.tasks.some((task) => task.title === this.state.newTask)) {
      assignment.tasks.push({
        title: this.state.newTask,
        completed: false,
        inProgress: false,
        todo: true,
      });
      updateAssignment(assignment);
    }
    this.setState({ newTask: "" });
    Keyboard.dismiss();
  };

  //Task object
  rendertask = (task, index) => {
    const assignment = this.props.assignment;

    return (
      // Swipe right to remove a task
      <Swipeable
        renderRightActions={(_, dragX) => rightActionsRemoveTask(dragX, index, assignment)}
      >
        {/* -----Container for each task----- */}
        <View style={styles.container}>
          {/* Task header - description of task, if completed cross out */}
          <Text
            style={[
              styles.taskDescription,
              {
                textDecorationLine: task.completed ? "line-through" : "none",
                color: getBackgroundColor(index, assignment),
              },
            ]}
          >
            {task.title}
          </Text>
          {/* Task state - toggle with touch*/}
          <View style={styles.taskStateContainer}>
            <TouchableOpacity onPress={() => toggleTaskState(assignment, index, true, false, false)}>
              <MaterialCommunityIcons
                name={task.todo ? "square" : "square-outline"}
                size={24}
                color={task.todo ? "red" : "gray"}
                style={{ width: 32 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: task.todo ? "red" : "gray",
              }}
            >
              Todo
            </Text>
          </View>
          <View style={styles.taskStateContainer}>
            <TouchableOpacity onPress={() => toggleTaskState(assignment, index, false, true, false)}>
              <MaterialCommunityIcons
                name={task.inProgress ? "square" : "square-outline"}
                size={24}
                color={task.inProgress ? "orange" : "gray"}
                style={{ width: 32 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: task.inProgress ? "orange" : "gray",
              }}
            >
              In-Progress
            </Text>
          </View>
          <View style={styles.taskStateContainer}>
            <TouchableOpacity onPress={() => toggleTaskState(assignment, index, false, false, true)}>
              <MaterialCommunityIcons
                name={task.completed ? "square" : "square-outline"}
                size={24}
                color={task.completed ? "green" : "gray"}
                style={{ width: 32 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                color: task.completed ? "green" : "gray",
              }}
            >
              Completed
            </Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  //Modal holding tasks
  render() {
    //Value to populate modal
    const assignment = this.props.assignment;
    const taskCount = assignment.tasks.length;
    const completedCount = assignment.tasks.filter(
      (task) => task.completed
    ).length;

    //UI
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.taskContainer}>
          {/* close pop-up - press button to close*/}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={this.props.closeModal}
          >
            <MaterialCommunityIcons name="close" size={24} color={"black"} />
          </TouchableOpacity>

          {/* -----assigment description------ */}
          <View
            style={[
              styles.section,
              styles.headerContainer,
              { borderBottomColor: assignment.color },
            ]}
          >
            <View>
              {/* assignment title and weight */}
              <Text style={styles.title}>
                {assignment.course}: {assignment.name} ({assignment.percentage}
                %)
              </Text>
              {/* assignment dueDate */}
              <Text style={styles.assignmentDescription}> Due on {assignment.dueDate}</Text>
              {/* completed count */}
              <View style={{flexDirection:"row"}}>
              <Text style={styles.assignmentDescription}>
                {completedCount} of {taskCount} tasks completed
              </Text>
              {/* remove assignment */}
              <TouchableOpacity onPress={this.createConfirmation} style={styles.removeAssignmentButton}>
                <Text style={styles.removeButtonText}>Remove Assignment</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*  -----List of current task------ */}
          <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
            <FlatList
              data={assignment.tasks}
              renderItem={({ item, index }) => this.rendertask(item, index)}
              keyExtractor={(item) => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>

          {/* -----Add task at bottom of screen---- */}
          <View style={[styles.section, styles.footer]}>
            {/* Add decription for task */}
            <TextInput
              style={[styles.input, { borderColor: assignment.color }]}
              onChangeText={(text) => this.setState({ newTask: text })}
              value={this.state.newTask}
            />
            {/* submit task to assignment */}
            <TouchableOpacity
              style={[styles.addTaskButton, { backgroundColor: assignment.color }]}
              onPress={() => this.addTask()}
            >
              <MaterialCommunityIcons
                name="plus-box-outline"
                size={16}
                color={"white"}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

//Style of components
const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    alignSelf: "stretch",
  },
  headerContainer: {
    justifyContent: "flex-end",
    marginLeft: 40,
    borderBottomWidth: 3,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.black,
  },
  assignmentDescription: {
    marginTop: 8,
    marginBottom: 18,
    color: colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTaskButton: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingVertical: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 32,
  },
  taskDescription: {
    color: colors.darkBlue,
    fontWeight: "700",
    fontSize: 16,
  },
  taskStateContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 64,
    right: 32,
    zIndex: 10,
  },
  removeAssignmentButton: {
    backgroundColor: "#ba1e13",
    width: 130,
    height: 25,
    padding: 5,
    borderRadius: 10,
    left: 50,
    alignItems: "center",
  },
  removeButtonText:{
    fontWeight: "600", color: "white", fontSize: 12
  }
});
