//Imports
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_neumorphic/flutter_neumorphic.dart';
import 'help/help_page.dart';
import 'introduction_page.dart';

class AccountPage extends StatefulWidget {
  const AccountPage({Key? key}) : super(key: key);

  @override
  State<AccountPage> createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  //current user
  final user = FirebaseAuth.instance.currentUser!;

  //variables for user data
  String name = '';
  String preferredCommunicationForm = 'Other';
  String preferredListeningForm = 'Other';

  //get user data from firestore
  @override
  void initState() {
    super.initState();
    FirebaseFirestore.instance
        .collection('users')
        .doc(FirebaseAuth.instance.currentUser!.uid)
        .get()
        .then((value) {
      setState(() {
        name = value['name'];
        preferredCommunicationForm = value['preferredCommunicationForm'];
        preferredListeningForm = value['preferredListeningForm'];
      });
    });
  }

  //sign out user
  void signOutUser() {
    FirebaseAuth.instance.signOut();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeumorphicColors.background,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Center(
            child: Column(
              children: [
                Neumorphic(
                  child: Padding(
                    padding: const EdgeInsets.all(10),
                    //<----------------Current User------------------->
                    child: Row(
                      children: [
                        Icon(Icons.account_circle_outlined,
                            color: Colors.blue[400]),
                        const SizedBox(
                          width: 10,
                        ),
                        Text(
                          user.email!,
                          style: TextStyle(
                              color: Colors.blue[400],
                              fontSize: 16,
                              fontWeight: FontWeight.bold),
                        ),
                        const Spacer(),
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                //<----------------Introduction card------------------->
                Card(
                  child: InkWell(
                    splashColor: Colors.blue.withAlpha(30),
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const IntroductionPage()),
                    ),
                    child: Neumorphic(
                      style: NeumorphicStyle(
                        color: Colors.grey[100],
                      ),
                      child: SizedBox(
                        width: 400,
                        height: 340,
                        child: Center(
                          child: Padding(
                            padding: const EdgeInsets.all(22.0),
                            child: Text(
                                'Hi my name is $name,\n\nI prefer to communicate'
                                ' using $preferredCommunicationForm and I '
                                'prefer to listen using '
                                '$preferredListeningForm.\n\nCould you '
                                'download "Interchange" from the play store'
                                ' so we can communicate more effectively?',
                                style: TextStyle(
                                    color: Colors.blue[800], fontSize: 22)),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                //<----------------Help button------------------->
                Row(
                  children: [
                    Expanded(
                      child: NeumorphicButton(
                        onPressed: () {
                          //navigate to help page
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const HelpPage(),
                            ),
                          );
                        },
                        child: Text('HELP',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.blue[600],
                                fontSize: 16,
                                fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                //<----------------Sign out button------------------->
                Row(
                  children: [
                    Expanded(
                      child: NeumorphicButton(
                        style: const NeumorphicStyle(
                          color: Colors.blue,
                        ),
                        onPressed: () {
                          signOutUser();
                        },
                        child: const Text('SIGN OUT',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
