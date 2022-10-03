//Imports
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class AboutSpeechPage extends StatelessWidget {
  const AboutSpeechPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.blue,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20.0, 80.0, 20.0, 20.0),
        child: Center(
          child: Column(
            children: [
              //<----------------Header------------------->
              const Text(
                'SPEECH PAGE',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              //space box
              const SizedBox(
                height: 40,
              ),
              //<----------------Image------------------->
              SizedBox(
                width: 300,
                height: 400,
                child: Lottie.asset('assets/animation/speech.json',
                    width: 200, height: 200, fit: BoxFit.fill),
              ),
              const SizedBox(
                height: 10,
              ),
              //<----------------Description------------------->
              const Padding(
                padding: EdgeInsets.all(20.0),
                child: Text(
                  'To use the speech page, press on the microphone icon and speak into the microphone. The app will then translate your speech into text and display it on the screen. You can then copy, clear or adjust the text format.',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
