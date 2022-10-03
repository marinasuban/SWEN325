//Import general
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import React from "react";
import SegmentedControl from "@react-native-community/segmented-control";

//Import screen
import AssignmentObject from "./AssignmentObject";
import AddAssignmentModal from "./AddAssignmentModal";

//Import function
import { auth } from "../../../firebaseSetup";
import { db } from "../../../firebaseSetup";

//Import Style
import colors from "../../assets/colors/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();

//Import methods
import translateStringtoField from "./Method/translateStringtoField";

export default class MainAssignmentBoardScreen extends React.Component {
  //Controls state: if add asignment screen is shown and what assignments are shown
  state = {
    addAssignmentVisible: false,
    listsOfAssignments: [],
    loading: true,
  };

  //Continuously reads data and updates state
  componentDidMount = () => {
    this.unsubscribe = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("lists")
      .onSnapshot((snapshot) => {
        dbLists = [];

        snapshot.forEach((doc) => {
          dbLists.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ listsOfAssignments: dbLists });
        this.setState({ loading: false });
      });
  };

  //Toggle add assignment screen display
  toggleAddAssignmentModal = () => {
    this.setState({ addAssignmentVisible: !this.state.addAssignmentVisible });
  };

  //Method to sort assignmnet by value
  reorderAssignment = (orderValue) => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("lists")
      .orderBy(orderValue)
      .onSnapshot((snapshot) => {
        dbLists = [];

        snapshot.forEach((doc) => {
          dbLists.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ listsOfAssignments: dbLists });
      });
  };

  //Render assignment object
  renderAssignment = (assignment) => {
    return <AssignmentObject assignment={assignment} />;
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

    return (
      //Screen
      <View style={styles.container}>
        {/* Pop-up add assignment screen - when state true make visible */}
        <Modal
          animationType="slide"
          visible={this.state.addAssignmentVisible}
          onRequestClose={this.toggleAddAssignmentModal}
        >
          <AddAssignmentModal closeModal={this.toggleAddAssignmentModal} />
        </Modal>

        {/* ------ Display header and Button to add assignments ----- */}
        <View style={styles.topBarContainer}>
          {/* Header */}
          <Text style={styles.titleTopBar}>ASSIGNMENTS</Text>
          {/* Add assignment button */}
          <TouchableOpacity
            style={styles.addAssignmentButton}
            onPress={this.toggleAddAssignmentModal}
          >
            <MaterialCommunityIcons
              name="plus-box-outline"
              size={40}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
          {/* screen description */}
          <Text style={styles.descriptionText}>
            Manage assignments by tracking your progress on tasks.
          </Text>
          {/* sort assignments bar - reorder assignments based on value */}
          <Text style={styles.sortDescriptionText}>Sort Assignments By:</Text>
          <SegmentedControl
            values={["Course", "Assignment", "Due-date", "Percentage"]}
            onChange={(event) => {
              this.reorderAssignment(
                translateStringtoField(event.nativeEvent.value)
              );
            }}
            style={styles.sortBar}
          />
        </View>

        {/* -----Display assignments in database---- */}
        <View style={styles.assignmentContainer}>
          <FlatList
            data={this.state.listsOfAssignments}
            keyExtractor={(item) => item.id.toString()}
            vertical={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderAssignment(item)}
            keyboardShouldPersistTaps="always"
          />
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
  titleTopBar: {
    fontSize: 30,
    fontWeight: "800",
    fontWeight: "bold",
    color: colors.darkBlue,
    paddingHorizontal: 20,
  },
  addAssignmentButton: {
    left: 340,
    top: -40,
  },
  descriptionText: {
    color: "grey",
    fontWeight: "600",
    fontSize: 12,
    width: 200,
    top: -40,
    left: 22,
  },
  topBarContainer: {
    paddingTop: 200,
    alignSelf: "flex-start",
  },
  assignmentContainer: {
    width: 400,
    height: 770,
    paddingBottom: 250,
  },
  sortDescriptionText: {
    color: colors.darkBlue,
    fontWeight: "600",
    fontSize: 12,
    width: 200,
    top: -30,
    left: 22,
    marginTop: 10,
  },
  sortBar: {
    height: 30,
    width: 370,
    left: 10,
    top: -20,
  },
});
