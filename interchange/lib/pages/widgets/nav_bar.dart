//Imports
import 'package:flutter/material.dart';
import 'package:interchange/pages/signlanguage_page.dart';
import 'package:interchange/pages/speech_page.dart';
import 'package:interchange/pages/text_page.dart';
import '../userSettings/account_page.dart';
import 'package:google_fonts/google_fonts.dart';

class NavBar extends StatefulWidget {
  const NavBar({Key? key}) : super(key: key);

  @override
  State<NavBar> createState() => _NavBarState();
}

class _NavBarState extends State<NavBar> {
  //controller for the pageview
  int _selectedIndex = 0;

  //pageview
  final _pages = [
    const SignLanguagePage(),
    const SpeechPage(),
    const TextPage(),
    const AccountPage(),
  ];

  @override
  Widget build(BuildContext context) => DefaultTabController(
    length: 4,
    child: Scaffold(
      appBar: AppBar(
        title: Padding(
          padding: const EdgeInsets.only(top: 10.0),
          //<----------------LOGO------------------->
          child: Text(
            'INTERCHANGE',
            style: GoogleFonts.bebasNeue(
              fontSize: 40,
              color: Colors.white,
            ),
          ),
        ),
        //<----------------Nav------------------->
        centerTitle: false,
        bottom: TabBar(
          onTap: (index) {
            setState(() {
              _selectedIndex = index;
            });
          },
          tabs: const [
            Tab(
              icon: Icon(Icons.accessibility, size: 22),
              text: 'Sign',
            ),
            Tab(
              icon: Icon(Icons.mic, size: 22),
              text: 'Speech',
            ),
            Tab(
              icon: Icon(Icons.text_fields, size: 22),
              text: 'Text',
            ),
            Tab(
              icon: Icon(Icons.account_circle, size: 22),
              text: 'Account',
            ),
          ],
        ),
      ),
      body: _pages[_selectedIndex],
        )
  );
}
