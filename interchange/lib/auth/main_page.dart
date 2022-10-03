// Imports
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import '../pages/widgets/nav_bar.dart';
import 'auth_page.dart';

// Main page for the app
class MainPage extends StatelessWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<User?>(
          // StreamBuilder is a widget that builds itself based on the latest snapshot of interaction with a specified Stream
          stream: FirebaseAuth.instance.authStateChanges(),
          // authStateChanges() is a stream that emits the current user when the authentication state changes
          builder: (context, snapshot) {
            // builder is a function that takes the context and snapshot and returns a widget
            // If the user is not logged in, show the AuthPage
            if (snapshot.hasData) {
              return const NavBar();
            } else {
              return const AuthPage();
            }
          }),
    );
  }
}
