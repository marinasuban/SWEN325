//Import general
import React from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";

//import style
import colors from "../../../assets/colors/colors";

//import method
import updateCourse from "./updateCourse";

//Swipe right to remove result method
export default rightActionRemoveResult = (course, dragX, index) => {
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
    <TouchableOpacity onPress={() => this.deleteResult(course, index)}>
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

//delete result
deleteResult = (course, index) => {
  course.results.splice(index, 1);

  updateCourse(course);
};

const styles = StyleSheet.create({
  deleteButton: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});
