//Imports
import 'package:flutter/services.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:avatar_glow/avatar_glow.dart';
import 'package:flutter_neumorphic/flutter_neumorphic.dart';

class SpeechPage extends StatefulWidget {
  const SpeechPage({Key? key}) : super(key: key);

  @override
  State<SpeechPage> createState() => _SpeechPageState();
}

class _SpeechPageState extends State<SpeechPage> {
  //Speech to text
  late stt.SpeechToText _speech;

  //Speech to text listener
  bool _isListening = false;

  //Speech to text result
  String _text = '';
  String _prev = '';

  //fontSize
  double _fontSize = 20.0;

  //text font size options
  final fontSizeList = [20.0, 24.0, 28.0, 32.0, 36.0, 40.0, 44.0, 48.0, 52.0];

  //initialise speech to text
  @override
  void initState() {
    super.initState();
    _speech = stt.SpeechToText();
  }

  //dispose all streams
  @override
  void dispose() {
    _speech.stop();
    super.dispose();
  }

  //controls text box output
  textOutput() {
    if (_text == '' && _prev == '') {
      return Text(
        'Press the mic button to convert speech into text...',
        textAlign: TextAlign.left,
        style: TextStyle(
          color: Colors.grey[600],
          fontSize: _fontSize,
          fontWeight: FontWeight.w400,
        ),
      );
    } else {
      return Text(
        '$_prev\n$_text',
        textAlign: TextAlign.left,
        style: TextStyle(
          color: Colors.blue[800],
          fontSize: _fontSize,
          fontWeight: FontWeight.w400,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: NeumorphicColors.background,
      //<----------------Speech button------------------->
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: AvatarGlow(
        animate: _isListening,
        glowColor: Theme.of(context).primaryColor,
        endRadius: 75.0,
        duration: const Duration(milliseconds: 2000),
        repeatPauseDuration: const Duration(milliseconds: 100),
        repeat: true,
        child: FloatingActionButton(
          onPressed: _listen,
          child: Icon(_isListening ? Icons.mic : Icons.mic_none),
        ),
      ),
      //<----------------Body------------------->
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Center(
            child: Column(children: [
              //<----------------Text Box------------------->
              Neumorphic(
                style: const NeumorphicStyle(
                  color: Colors.white70,
                ),
                child: SizedBox(
                  height: 500,
                  width: 400,
                  child: Padding(
                    padding: const EdgeInsets.all(30.0),
                    child: SingleChildScrollView(
                      child: textOutput(),
                    ),
                  ),
                ),
              ),
              //<----------------Controls------------------->
              Padding(
                padding: const EdgeInsets.only(top: 15.0),
                child: Row(
                  children: <Widget>[
                    //CLEAR BUTTON
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.only(right: 5),
                        child: NeumorphicButton(
                          onPressed: () {
                            setState(() {
                              _text = '';
                              _prev = '';
                            });
                          },
                          child: const Text(
                            'CLEAR',
                            textAlign: TextAlign.center,
                            style: TextStyle(color: Colors.black, fontSize: 14),
                          ),
                        ),
                      ),
                    ),
                    //COPY BUTTON
                    Expanded(
                      child: NeumorphicButton(
                        onPressed: () {
                          Clipboard.setData(
                              ClipboardData(text: '$_prev\n$_text'));
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Copied to Clipboard'),
                            ),
                          );
                        },
                        child: const Text(
                          'COPY',
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Colors.black, fontSize: 14),
                        ),
                      ),
                    ),
                    const SizedBox(width: 40),
                    //FONTSIZE SELECTOR
                    Row(
                      children: [
                        Text('FONTSIZE',
                            style: TextStyle(
                                color: Colors.blue[800],
                                fontSize: 18,
                                fontWeight: FontWeight.w400)),
                        const SizedBox(
                          width: 20,
                        ),
                        DropdownButton<String>(
                          value: _fontSize.toString(),
                          icon: const Icon(Icons.arrow_drop_down),
                          iconSize: 24,
                          elevation: 16,
                          style:
                              TextStyle(color: Colors.blue[800], fontSize: 16),
                          underline: Container(
                            height: 2,
                            color: Colors.blue[800],
                          ),
                          onChanged: (String? newValue) {
                            setState(() {
                              _fontSize = double.parse(newValue!);
                            });
                          },
                          items: fontSizeList
                              .map<DropdownMenuItem<String>>((double value) {
                            return DropdownMenuItem<String>(
                              value: value.toString(),
                              child: Text(value.toString()),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ]),
          ),
        ),
      ),
    );
  }

  //listen speech to text
  void _listen() async {
    //check if speech to text is available
    if (!_isListening) {
      bool available = await _speech.initialize(
        onStatus: (val) => print('onStatus: $val'),
        onError: (val) => print('onError: $val'),
      );
      //if speech to text is available
      if (available) {
        _prev = '$_prev\n$_text';
        _text = '';
        setState(() => _isListening = true);
        //listen to speech to text
        _speech.listen(
          onResult: (val) => setState(() {
            _text = val.recognizedWords;
          }),
        );
      }
    } else {
      //stop listening to speech to text
      setState(() => _isListening = false);
      _speech.stop();
    }
  }
}
