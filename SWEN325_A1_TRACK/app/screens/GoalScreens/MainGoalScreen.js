//Import general
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import SegmentedControl from "@react-native-community/segmented-control";
import * as Progress from "react-native-progress";

//Import screen
import GoalObject from "./GoalObject";
import AddGoalModal from "./AddGoalModal";

//Import Style
import colors from "../../assets/colors/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();

//Import function
import { auth } from "../../../firebaseSetup";
import { db } from "../../../firebaseSetup";

//Import method
import progressRatio from "./Method/progressRatio";

export default class MainGoalScreen extends Component {
  //state for screen
  state = {
    addGoalVisible: false,
    goalsList: [],
    loading: true,
  };

  //Continuously reads data and updates state
  componentDidMount = () => {
    this.unsubscribe = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("goals")
      .onSnapshot((snapshot) => {
        dbGoals = [];

        snapshot.forEach((doc) => {
          dbGoals.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ goalsList: dbGoals });
        this.setState({ loading: false });
      });
  };

  //Toggle add goal screen display
  toggleAddGoalModal() {
    this.setState({ addGoalVisible: !this.state.addGoalVisible });
  }

  //method to filter goal received from db
  filterGoal = (filterValue) => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("goals")
      .onSnapshot((snapshot) => {
        dbGoals = [];

        snapshot.forEach((doc) => {
          dbGoals.push({ id: doc.id, ...doc.data() });
        });
        if (filterValue !== "All") {
          dbGoals = dbGoals.filter((goals) => goals.progress === filterValue);
        }
        this.setState({ goalsList: dbGoals });
      });
  };

  //render goal object
  renderGoal = (goal) => {
    return <GoalObject goal={goal} updateProgress={this.updateProgress} />;
  };

  //update progress state of a goal object
  updateProgress = (goal, value, index) => {
    this.setState({
      goalsList: this.state.goalsList.map((item) => {
        if (item.id === goal.id) {
          const newGoal = { ...item, progress: value, progressIndex: index };
          return newGoal;
        } else {
          return item;
        }
      }),
    });
  };

  //UI
  render() {
    //if components not ready show loading screen
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }

    //else show main goal screen
    return (
      <View style={styles.container}>
        {/* Pop-up add goal screen - visible when button selected*/}
        <Modal
          animationType="slide"
          visible={this.state.addGoalVisible}
          onRequestClose={() => this.toggleAddGoalModal()}
        >
          <AddGoalModal closeModal={() => this.toggleAddGoalModal()} />
        </Modal>

        {/* -----Display header and Button to add goal----- */}
        <View style={styles.topBarContainer}>
          {/* header */}
          <Text style={styles.title}>GOALS</Text>
          {/* add goal button */}
          <TouchableOpacity
            style={styles.addAssignmentButton}
            onPress={() => this.toggleAddGoalModal()}
          >
            <MaterialCommunityIcons
              name="plus-box-outline"
              size={40}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
          {/* header description */}
          <Text style={styles.titleDescription}>
            Manage goals by tracking your progress.
          </Text>
          {/* filter goals by state*/}
          <Text style={styles.filterDescription}>Show Goals By:</Text>
          <SegmentedControl
            values={["All", "Inactive", "In-Progress", "Completed"]}
            style={styles.filterTab}
            onChange={(event) => {
              this.filterGoal(event.nativeEvent.value);
              this.selectedIndex = event.nativeEvent.selectedSegmentIndex;
            }}
            selectedIndex={0}
          />
        </View>

        {/* -----Display goals in database----- */}
        <View style={styles.goalsContainer}>
          <FlatList
            data={this.state.goalsList}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => this.renderGoal(item, index)}
            keyboardShouldPersistTaps="always"
          />
        </View>

        {/* -----Display stats of goal in database----- */}
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewTitle}>Overview</Text>
          {/* percentage of inactive goals */}
          <View style={styles.spacing}>
            <Progress.Bar
              progress={progressRatio(this.state.goalsList, "Inactive")}
              width={310}
              height={15}
              color={colors.lightlightBlue}
            />
            <Text style={styles.progressBarText}>Inactive</Text>
          </View>
          {/* percentage of active goals */}
          <View style={styles.spacing}>
            <Progress.Bar
              progress={progressRatio(this.state.goalsList, "In-Progress")}
              width={310}
              height={15}
              color={colors.blue}
            />
            <Text style={styles.progressBarText}>In-Progress</Text>
          </View>
          {/* percentage of completed goals */}
          <View>
            <Progress.Bar
              progress={progressRatio(this.state.goalsList, "Completed")}
              width={310}
              height={15}
              color={colors.darkBlue}
            />
            <Text style={styles.progressBarText}>Completed</Text>
          </View>
        </View>
      </View>
    );
  }
}

//Style of components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    fontWeight: "bold",
    color: colors.darkBlue,
    paddingHorizontal: 20,
  },
  topBarContainer: {
    alignSelf: "flex-start",
    top: -30,
  },
  addAssignmentButton: {
    left: 340,
    top: -40,
  },
  titleDescription: {
    color: "grey",
    fontWeight: "600",
    fontSize: 12,
    width: 200,
    left: 22,
    top: -40,
  },
  goalsContainer: {
    width: 400,
    height: 270,
    paddingLeft: 15,
    top: -40,
  },
  filterDescription: {
    color: colors.darkBlue,
    fontWeight: "600",
    fontSize: 12,
    width: 200,
    left: 20,
    marginTop: 10,
    top: -30,
  },
  progressBarText: {
    fontWeight: "500",
    color: "grey",
  },
  spacing: {
    marginBottom: 10,
  },
  overviewContainer: {
    backgroundColor: colors.background,
    width: 364,
    height: 240,
    top: -40,
    borderRadius: 10,
    padding: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  overviewTitle: {
    textAlign: "center",
    paddingBottom: 30,
    fontSize: 20,
    fontWeight: "700",
    color: colors.darkBlue,
  },
  filterTab: {
    height: 30,
    width: 370,
    left: 10,
    top: -20,
    backgroundColor: "white",
  },
});
