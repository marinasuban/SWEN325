// Imports
import 'package:flutter/material.dart';
import 'package:interchange/pages/OnBoarding/login_page.dart';
import '../pages/OnBoarding/signup_page.dart';

class AuthPage extends StatefulWidget {
  const AuthPage({Key? key}) : super(key: key);

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  // Show Login page
  bool showLoginPage = true;

  // Toggle between login and sign up
  void toggleScreens() {
    setState(() {
      showLoginPage = !showLoginPage;
    });
  }

  // Show login or sign up page
  @override
  Widget build(BuildContext context) {
    if (showLoginPage == true) {
      return LoginPage(showSignUpPage: toggleScreens);
    } else {
      return SignUpPage(showLoginPage: toggleScreens);
    }
  }
}
