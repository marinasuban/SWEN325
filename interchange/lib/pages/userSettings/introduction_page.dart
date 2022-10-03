//Imports
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_neumorphic/flutter_neumorphic.dart';

class IntroductionPage extends StatefulWidget {
  const IntroductionPage({Key? key}) : super(key: key);

  @override
  State<IntroductionPage> createState() => _IntroductionPageState();
}

class _IntroductionPageState extends State<IntroductionPage> {
  //variables for user data
  String _name = '';
  String _preferredCommunicationForm = 'Other';
  String _preferredListeningForm = 'Other';

  //dropdown communication options
  final communicationForms = ['Sign', 'Speech', 'Text', 'Other'];

  //update user data in firestore
  Future update() async {
    await FirebaseFirestore.instance
        .collection('users')
        .doc(FirebaseAuth.instance.currentUser!.uid)
        .update({
      'name': _name,
      'preferredCommunicationForm': _preferredCommunicationForm,
      'preferredListeningForm': _preferredListeningForm,
    });
  }

  //initialise user data
  @override
  void initState() {
    super.initState();
    FirebaseFirestore.instance
        .collection('users')
        .doc(FirebaseAuth.instance.currentUser!.uid)
        .get()
        .then((value) {
      setState(() {
        _name = value['name'];
        _preferredCommunicationForm = value['preferredCommunicationForm'];
        _preferredListeningForm = value['preferredListeningForm'];
      });
    });
  }

  //set name to placeholder if empty
  String setName() {
    if (_name == '') {
      return 'Enter name...';
    } else {
      return _name;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeumorphicColors.background,
      //<----------------Nav Bar------------------->
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Row(
          children: const [
        Spacer(),
        Text("EDIT INTRODUCTION "),
        SizedBox(width: 10),
        Icon(Icons.edit, color: Colors.white),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Center(
            child: Column(
              children: [
                Row(
                  children: [
                    //<----------------Name------------------->
                    const Text("Hi my name is ",
                        style: TextStyle(color: Colors.black, fontSize: 20)),
                    const SizedBox(width: 10),
                    Neumorphic(
                      style: const NeumorphicStyle(
                        color: Colors.white,
                      ),
                      child: SizedBox(
                        width: 180,
                        height: 40,
                        child: Padding(
                          padding: const EdgeInsets.only(left: 20.0),
                          child: TextField(
                            style: TextStyle(
                              color: Colors.blue[800],
                              fontSize: 18.0,
                            ),
                            decoration: InputDecoration(
                                border: InputBorder.none,
                                hintStyle: TextStyle(
                                    color: Colors.grey[600], fontSize: 18.0),
                                hintText: setName()),
                            onChanged: (value) {
                              setState(() {
                                _name = value;
                              });
                            },
                          ),
                        ),
                      ),
                    ),
                    const Text(" ,",
                        style: TextStyle(color: Colors.black, fontSize: 20)),
                  ],
                ),
                //<----------------Communication------------------->
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 50, 100, 30),
                  child: Column(
                    children: [
                      const Text("I prefer communicating using ",
                          style:
                              TextStyle(color: Colors.black, fontSize: 20)),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(5, 20, 0, 0),
                        child: Neumorphic(
                          style: const NeumorphicStyle(
                            color: Colors.white,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(left: 20),
                            child: DropdownButton<String>(
                              isExpanded: true,
                              value: _preferredCommunicationForm,
                              icon: const Icon(Icons.arrow_drop_down),
                              style: TextStyle(
                                  color: Colors.blue[800], fontSize: 16),
                              onChanged: (String? value) {
                                // This is called when the user selects an item.
                                setState(() {
                                  _preferredCommunicationForm = value!;
                                });
                              },
                              items: communicationForms
                                  .map<DropdownMenuItem<String>>(
                                      (String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                //<----------------Listen------------------->
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 20, 0, 0),
                  child: Column(
                    children: [
                      const Text(
                          "And I understand best when you communicate to me in ",
                          style:
                              TextStyle(color: Colors.black, fontSize: 20)),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(5, 20, 100, 30),
                        child: Neumorphic(
                          style: const NeumorphicStyle(
                            color: Colors.white,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.only(left: 20),
                            child: DropdownButton<String>(
                              isExpanded: true,
                              value: _preferredListeningForm,
                              icon: const Icon(Icons.arrow_drop_down),
                              style: TextStyle(
                                  color: Colors.blue[800], fontSize: 16),
                              onChanged: (String? value) {
                                // This is called when the user selects an item.
                                setState(() {
                                  _preferredListeningForm = value!;
                                });
                              },
                              items: communicationForms
                                  .map<DropdownMenuItem<String>>(
                                      (String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                //<----------------Closer------------------->
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 20, 0, 150),
                  child: Column(
                    children: const [
                      Text(
                        "Could you download 'Interchange' from the play "
                        "store so we can communicate more effectively?",
                        style: TextStyle(color: Colors.black, fontSize: 20),
                      ),
                    ],
                  ),
                ),
                //<----------------save button------------------->
                Row(
                  children: [
                    Expanded(
                      child: NeumorphicButton(
                        style: const NeumorphicStyle(
                          color: Colors.blue,
                        ),
                        onPressed: () {
                          update();
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Updated Introduction'),
                            ),
                          );
                        },
                        child: const Text(
                          'SAVE',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold),
                        ),
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
