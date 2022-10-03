//Imports
import 'package:flutter/material.dart';
import 'package:interchange/pages/userSettings/help/aboutSign_page.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'aboutSpeech_page.dart';
import 'aboutText_page.dart';

class HelpPage extends StatefulWidget {
  const HelpPage({Key? key}) : super(key: key);

  @override
  State<HelpPage> createState() => _HelpPageState();
}

class _HelpPageState extends State<HelpPage> {
  //controller for the pageview
  final PageController _pageController = PageController();

  //last page bool
  bool onLastPage = false;

  //dispose controller
  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          //<----------------Swipe to navigate------------------->
          PageView(
            controller: _pageController,
            onPageChanged: (index) {
              setState(() {
                onLastPage = index == 2;
              });
            },
            children: const [
              AboutSignPage(),
              AboutSpeechPage(),
              AboutTextPage(),
            ],
          ),
          //<----------------Skip to end------------------->
          Container(
            alignment: const Alignment(0, 0.9),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                //skip
                TextButton(
                  onPressed: () {
                    _pageController.jumpToPage(2);
                  },
                  child: const Text(
                    'SKIP',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                ),
                //<----------------Manual navigator------------------->
                SmoothPageIndicator(
                    controller: _pageController,
                    count: 3,
                    effect: ExpandingDotsEffect(
                        dotHeight: 12,
                        dotWidth: 12,
                        dotColor: Colors.blue.shade100,
                        activeDotColor: Colors.white,
                        spacing: 5)),
                //<----------------Next or done------------------->
                onLastPage
                    ? TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: const Text(
                          'DONE',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                          ),
                        ),
                      )
                    : TextButton(
                        onPressed: () {
                          _pageController.nextPage(
                              duration: const Duration(milliseconds: 500),
                              curve: Curves.easeIn);
                        },
                        child: const Text(
                          'NEXT',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                          ),
                        ),
                      ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
