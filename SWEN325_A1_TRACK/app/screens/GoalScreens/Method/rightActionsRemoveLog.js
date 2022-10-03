//Import general
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

//import style
import colors from "../../../assets/colors/colors";

//import method
import updateGoal from "./updateGoal";

//Swipe right to remove method
export default rightActionsRemoveLog = (goal, dragX, index) => {
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
      <TouchableOpacity onPress={() => this.deleteLog(goal, index)}>
        <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
          <Animated.Text
            style={{
              color: "red",
              fontWeight: "800",
              transform: [{ scale }],
              paddingLeft: 30,
            }}
          >
            DELETE
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  //delete log from goal
  deleteLog = (goal, index) => {
    goal.logs.splice(index, 1);

    updateGoal(goal);
  };

  //Style of components
const styles = StyleSheet.create({
    deleteButton: {
        flex: 1,
        backgroundColor: colors.red,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
      },
})