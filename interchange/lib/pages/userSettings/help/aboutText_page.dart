//Imports
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class AboutTextPage extends StatelessWidget {
  const AboutTextPage({Key? key}) : super(key: key);

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
                'TEXT PAGE',
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
              //<----------------Animation------------------->
              SizedBox(
                width: 300,
                height: 400,
                child: Lottie.asset('assets/animation/text.json',
                    width: 200, height: 200, fit: BoxFit.fill),
              ),
              const SizedBox(
                height: 10,
              ),
              //<----------------Description------------------->
              const Padding(
                padding: EdgeInsets.all(20.0),
                child: Text(
                  'To use the text feature, you must first select the language you want to annotate. Then, you can type in the text you want to annotate. Once you have done that, you can press the speak button to annotate your text and adjust the voice as desired.',
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