//Import general
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

//Import screen
import TaskModal from "./TaskModal";

export default class AssignmentObject extends Component {
  //State of assignment object
  state = {
    showAssignmentVisible: false,
  };

  //toggle screen visibility
  toggleAssignmentModal = () => {
    this.setState({ showAssignmentVisible: !this.state.showAssignmentVisible });
  };

  //Create assignment object
  render() {
    //Const used to populate object
    const assignment = this.props.assignment;
    const completedCount = assignment.tasks.filter(
      (task) => task.completed
    ).length;
    const inProgressCount = assignment.tasks.filter(
      (task) => task.inProgress
    ).length;
    const todoCount = assignment.tasks.filter((task) => task.todo).length;

    //UI
    return (
      //Assignment object
      <View style={{ paddingBottom: 10 }}>
        {/* task pop-up - on click show tasks relating to assignment */}
        <Modal
          animationType="slide"
          visible={this.state.showAssignmentVisible}
          onRequestClose={this.toggleAssignmentModal}
        >
          <TaskModal
            assignment={assignment}
            closeModal={this.toggleAssignmentModal}
          />
        </Modal>

        {/* -----Visual content of object---- */}
        <TouchableOpacity
          style={[styles.container, { backgroundColor: assignment.color }]}
          onPress={this.toggleAssignmentModal}
        >
          {/* assignment title */}
          <Text style={styles.assignmentTitle} numberOfLines={1}>
            {assignment.course}: {assignment.name}
          </Text>
          {/* due-date */}
          <Text style={styles.assignmentDescription} numberOfLines={1}>
            Due-Date: {assignment.dueDate}
          </Text>
          {/* weight */}
          <Text style={styles.assignmentDescription} numberOfLines={1}>
            Weight: {assignment.percentage}%
          </Text>
          {/* tasks state */}
          <View
            style={{ alignItems: "center", alignSelf: "flex-start", top: 38 }}
          >
            <Text style={styles.count}>{todoCount}</Text>
            <Text style={styles.countDescription}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <Text style={styles.count}>{inProgressCount}</Text>
            <Text style={styles.countDescription}>In-Progress</Text>
          </View>
          <View
            style={{ alignItems: "center", alignSelf: "flex-end", top: -38 }}
          >
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.countDescription}>Completed</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

//Style of components
const styles = StyleSheet.create({
  container: {
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
  assignmentTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
  },
  count: {
    fontSize: 20,
    fontWeight: "300",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
  },
  countDescription: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
  },
  assignmentDescription: {
    fontSize: 17,
    fontWeight: "400",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
  },
});
