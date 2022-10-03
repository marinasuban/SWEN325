//import general
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import { auth } from "../../firebaseSetup";
import { useNavigation } from "@react-navigation/native";

//import style
import colors from "../assets/colors/colors";

//method to sign out
const AccountScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("OnBoarding");
      })
      .catch((error) => alert(error.message));
  };

  //UI
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/background-gif.gif")}
    >
      {/* header */}
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>TRACK.</Text>
          <Text style={styles.description}>
            Reach your goals faster and manage your workflow.
          </Text>
        </View>
        {/* user email */}
        <View
          style={styles.emailContainer}
        >
          <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
        </View>
        {/* sign out button */}
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.buttonBackgroundSignout}
        >
          <Text style={styles.buttonOutlineSignout}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBackgroundSignout: {
    //Signout button background
    backgroundColor: colors.blue,
    width: "70%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonOutlineSignout: {
    //Signout Button outline
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  background: {
    flex: 1,
  },
  textContainer: {
    width: "80%",
    paddingBottom: 50,
    paddingLeft: 30
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    top: -50,
    color: "white",
    textShadow: { width: 10, height: 10 },
    textShadowColor: colors.darkBlue,
    textShadowRadius: 10,
  },
  description: {
    fontWeight: "500",
    top: -40,
    fontSize: 15,
    color: colors.darkBlue,
    letterSpacing: 1,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.darkBlue,
  },
  emailContainer: {
    backgroundColor: "white",
    width: "70%",
    height: 60,
    borderRadius: 10,
    padding: 15,
    borderWidth: 3,
    borderColor: colors.blue,
  },
});