import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebaseSetup'
import { useNavigation } from '@react-navigation/native'
import colors from '../assets/colors/colors'

const OnBoardingScreen = () => {
    //Sets user input
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    
    // When user logins they enter the app
    const navigation = useNavigation()
    useEffect(() =>{ 
        const unsubscribe = auth.onAuthStateChanged(user =>{
            if (user) {
                navigation.replace("TabNavigator")
            }
        })
    return unsubscribe
    }, [])
    
    // Register user account (firebase)
    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(Email, Password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message))
    }

    // Logs user in given they have an account (firebase)
    const handleLogin = () => {
        auth.signInWithEmailAndPassword(Email, Password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
        })
        .catch(error => alert(error.message))
    }

  return (
    // Background
    <ImageBackground 
    style={styles.background}
    source={require("../assets/images/background-gif.gif")}>
    {/* Stops key board from blocking input */}
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
     {/* Displayed text (logo, description)      */}
    <View style={styles.textContainer}> 
            <Text style={styles.title}>TRACK.</Text>
            <Text style={styles.description}>Reach your goals faster and manage your workflow.</Text>
        </View>
    {/* Input fields */}
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={Email}
                onChangeText={text=>setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={Password}
                onChangeText={text=>setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
    </View>
    {/* Buttons */}
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonBackgroundLogin}
        >
        <Text style={styles.buttonOutlineLogin}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.buttonBackgroundLogin, styles.buttonBackgroundRegister]}
        >
        <Text style={styles.buttonOutlineRegister}>REGISTER</Text>
        </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default OnBoardingScreen
//Stylesheet for on boarding screen components
const styles = StyleSheet.create({
background:{
   flex: 1,
},
container:{
justifyContent: 'center',
alignItems:'center',
flex:1,
},
textContainer:{
    width: '80%',
},
title:{
    fontWeight: 'bold',
    fontSize: 80,
    top: -50,
    color: 'white',
    textShadow: { width: 10, height: 10 },
    textShadowColor: colors.darkBlue,
    textShadowRadius: 10,
},
description:{
    fontWeight: '500',
    top:-40,
    fontSize: 15,
    color: colors.darkBlue,
    letterSpacing: 1,
},
inputContainer:{
    width: '80%',
},
input:{
    //email and password box
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical:25,
    borderRadius:10,
    marginTop: 10,
    borderColor: colors.input,
    borderWidth: 2,
},
buttonContainer:{
    top: 10,
    width: '80%',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 20
},
buttonBackgroundLogin:{
    //Login button background
    backgroundColor: colors.blue,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems:'center',
},
buttonOutlineLogin:{
    //Login button text
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
},
buttonBackgroundRegister:{
    //Register button background
    backgroundColor:colors.lightBlue,
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 2,
},
buttonOutlineRegister:{
    //Register Button outline
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
},
})