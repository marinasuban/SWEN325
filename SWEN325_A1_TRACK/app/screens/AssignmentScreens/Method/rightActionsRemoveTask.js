//Import general
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

//import style
import colors from "../../../assets/colors/colors";

//Import methods
import updateAssignment from "./updateAssignment";

//Method used for swipe right to delete task
export default rightActionsRemoveTask = (dragX, index, assignment) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  const opacity = dragX.interpolate({
    inputRange: [-100, -20, 0],
    outputRange: [1, 0.9, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={() => deleteTask(index, assignment)}>
      <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
        <Animated.Text
          style={{
            color: "red",
            fontWeight: "800",
            transform: [{ scale }],
          }}
        >
          DELETE
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

deleteTask = (index, assignment) => {
  assignment.tasks.splice(index, 1);

  updateAssignment(assignment);
};

//Style of components
const styles = StyleSheet.create({
    deleteButton: {
      flex: 1,
      backgroundColor: colors.red,
      justifyContent: "center",
      alignItems: "center",
      width: 80,
    },
  });
  