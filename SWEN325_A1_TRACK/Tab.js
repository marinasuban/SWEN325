//Import General
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
 
//Import Screens
import AccountScreen from "./app/screens/AccountScreen";
import MainAssignmentBoardScreen from "./app/screens/AssignmentScreens/MainAssignmentBoardScreen";
import MainCourseScreen from "./app/screens/ResultsScreen/MainCourseScreen";
import MainGoalScreen from "./app/screens/GoalScreens/MainGoalScreen";

//Import Style
import colors from "./app/assets/colors/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    //create navigator
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.darkBlue,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 9,
          right: 9,
          elevation: 0,
          backgroundColor: colors.background,
          borderRadius: 25,
          height: 90,
          paddingTop: 20,
          ...styles.shadow,
        },
      }}
    >
      {/* create nav icon and assign screens */}
      <Tab.Screen
        name="Task"
        component={MainAssignmentBoardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Result"
        component={MainCourseScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-education"
              size={32}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Goal"
        component={MainGoalScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="progress-star"
              size={32}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-cog"
              size={32}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  //add shadow to nav bar
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNavigator;
