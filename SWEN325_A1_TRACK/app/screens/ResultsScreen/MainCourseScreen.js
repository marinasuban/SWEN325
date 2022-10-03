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
import CourseObject from "./CourseObject";
import AddCourseModal from "./AddCourseModal";

//Import function
import { auth } from "../../../firebaseSetup";
import { db } from "../../../firebaseSetup";

//Import Style
import colors from "../../assets/colors/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
MaterialCommunityIcons.loadFont();

//import Methods
import translateStringToField from "./Method/translateStringToField";

export default class MainCourseScreen extends React.Component {
  //Controls state: if add asignment screen is shown and what courses are shown
  state = {
    addCourseVisible: false,
    listsOfCourses: [],
    loading: true,
  };

  //Continuously reads data and updates state
  componentDidMount = () => {
    this.unsubscribe = db
      .collection("users")
      .doc(auth.currentUser?.uid)
      .collection("courses")
      .onSnapshot((snapshot) => {
        dbLists = [];

        snapshot.forEach((doc) => {
          dbLists.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ listsOfCourses: dbLists });
        this.setState({ loading: false });
      });
  };

  //Toggle add course screen display
  toggleAddCourseModal = () => {
    this.setState({ addCourseVisible: !this.state.addCourseVisible });
  };

  //method to sort assignmnet
  reorderCourse = (orderValue) => {
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("courses")
      .orderBy(orderValue)
      .onSnapshot((snapshot) => {
        dbLists = [];

        snapshot.forEach((doc) => {
          dbLists.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ listsOfCourses: dbLists });
      });
  };

  //Render course object
  renderCourse = (course, index) => {
    return <CourseObject course={course} index={index} />;
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
        {/* Pop-up add course screen - visible when button selectec */}
        <Modal
          animationType="slide"
          visible={this.state.addCourseVisible}
          onRequestClose={this.toggleAddCourseModal}
        >
          <AddCourseModal closeModal={this.toggleAddCourseModal} />
        </Modal>

        {/* ------Display header and Button to add courses------ */}
        <View style={styles.topBarContainer}>
          {/* header */}
          <Text style={styles.title}>RESULTS</Text>
          {/* add couse button */}
          <TouchableOpacity
            style={styles.addCourseButton}
            onPress={this.toggleAddCourseModal}
          >
            <MaterialCommunityIcons
              name="plus-box-outline"
              size={40}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
          {/* header description */}
          <Text style={styles.titleDescription}>
            Manage courses by tracking your results.
          </Text>
          {/* sort course tab */}
          <Text style={styles.sortText}>Sort Courses By:</Text>
          <SegmentedControl
            values={["Name", "Trimester", "Year"]}
            onChange={(event) => {
              this.reorderCourse(
                translateStringToField(event.nativeEvent.value)
              );
            }}
            style={styles.sortBar}
          />
        </View>

        {/* -----Display courses in database----- */}
        <View style={styles.courseContainer}>
          <FlatList
            data={this.state.listsOfCourses}
            keyExtractor={(item) => item.id.toString()}
            vertical={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => this.renderCourse(item, index)}
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
  title: {
    fontSize: 30,
    fontWeight: "800",
    fontWeight: "bold",
    color: colors.darkBlue,
    paddingHorizontal: 20,
  },
  addCourseButton: {
    left: 340,
    top: -40,
  },
  titleDescription: {
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
  courseContainer: {
    width: 400,
    height: 770,
    paddingBottom: 250,
  },
  sortText: {
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
