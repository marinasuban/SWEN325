//Imports
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class AboutSignPage extends StatelessWidget {
  const AboutSignPage({Key? key}) : super(key: key);

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
                'SIGN PAGE',
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
                child: Lottie.asset('assets/animation/sign.json',
                    width: 200, height: 200, fit: BoxFit.fill),
              ),
              const SizedBox(
                height: 10,
              ),
              //<----------------Description------------------->
              const Padding(
                padding: EdgeInsets.all(20.0),
                child: Text(
                  'To use the sign feature, you must turn the camera on and point it at the user communicating in sign language. The service will automatically translate sign to text and display it on the screen. You may annotate, copy, clear or break up the translation as needed.',
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
