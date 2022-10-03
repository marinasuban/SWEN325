//Import general
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

//Import screen
import LogModal from "./LogModal";

export default class GoalObject extends React.Component {
  //State of assignment object
  state = {
    showLogVisible: false,
  };

  //toggle screen visibility
  toggleLogModal() {
    this.setState({ showLogVisible: !this.state.showLogVisible });
  }

  //Create goal object and reset modal
  render() {
    const goal = this.props.goal;

    //UI
    return (
      <View>
        {/* ----logs modal visible when goal selected----- */}
        <Modal
          animationType="slide"
          visible={this.state.showLogVisible}
          onRequestClose={() => this.toggleLogModal()}
        >
          <LogModal
            goal={goal}
            closeModal={() => this.toggleLogModal()}
            updateProgress={this.props.updateProgress}
          />
        </Modal>

        {/* -----Visual content of object---- */}
        <TouchableOpacity
          style={[styles.goalContainer, { backgroundColor: goal.color }]}
          onPress={() => this.toggleLogModal()}
        >
          {/* header */}
          <Text style={styles.goalTitle} numberOfLines={3}>
            {goal.name}
          </Text>
          {/* goal state */}
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{goal.progress}</Text>
              <Text style={styles.subtitle}>State</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{goal.lastLog}</Text>
              <Text style={styles.subtitle}>Last Logged</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

//Style of components
const styles = StyleSheet.create({
  goalContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 2,
    alignItems: "center",
    width: 200,
    height: 250,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    height: 100,
    textAlign: "center",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
  },
  count: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
    shadowColor: "black",
    shadowOpacity: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0.5,
    paddingVertical: 5,
  },
});
