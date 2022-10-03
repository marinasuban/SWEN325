//Imports
import 'dart:async';
import 'package:text_to_speech/text_to_speech.dart';
import 'package:flutter_neumorphic/flutter_neumorphic.dart';

class TextPage extends StatefulWidget {
  const TextPage({Key? key}) : super(key: key);

  @override
  State<TextPage> createState() => _TextPageState();
}

class _TextPageState extends State<TextPage> {
  //default language
  final String defaultLanguage = 'en-US';

  //text to speech
  TextToSpeech tts = TextToSpeech();

  //text
  String text = '';

  //voice controls
  double volume = 1; // Range: 0-1
  double rate = 1.0; // Range: 0-2
  double pitch = 1.0; // Range: 0-2

  //language
  String? language;
  String? languageCode;
  List<String> languages = <String>[];
  List<String> languageCodes = <String>[];

  //voice
  String? voice;

  //text field controller
  final TextEditingController _textEditingController = TextEditingController();

  //initialise page
  @override
  void initState() {
    super.initState();
    _textEditingController.text = text;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      initLanguages();
    });
  }

  //dispose page
  @override
  void dispose() {
    _textEditingController.dispose();
    super.dispose();
  }

  Future<void> initLanguages() async {
    /// populate lang code (i.e. en-US)
    languageCodes = await tts.getLanguages();

    /// populate displayed language (i.e. English)
    final List<String>? displayLanguages = await tts.getDisplayLanguages();
    // if display languages are not available, use lang codes
    if (displayLanguages == null) {
      return;
    }

    /// populate languages list
    languages.clear();
    for (final dynamic lang in displayLanguages) {
      languages.add(lang as String);
    }

    /// set language
    final String? defaultLangCode = await tts.getDefaultLanguage();
    if (defaultLangCode != null && languageCodes.contains(defaultLangCode)) {
      languageCode = defaultLangCode;
    } else {
      languageCode = defaultLanguage;
    }
    language = await tts.getDisplayLanguageByCode(languageCode!);

    /// get voice
    voice = await getVoiceByLang(languageCode!);

    /// set state
    if (mounted) {
      setState(() {});
    }
  }

  //get voice by language
  Future<String?> getVoiceByLang(String lang) async {
    final List<String>? voices = await tts.getVoiceByLang(languageCode!);
    if (voices != null && voices.isNotEmpty) {
      return voices.first;
    }
    return null;
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
                //<----------------Text Box------------------->
                Neumorphic(
                  style: const NeumorphicStyle(
                    color: Colors.white70,
                  ),
                  child: SizedBox(
                    height: 350,
                    width: 400,
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: SingleChildScrollView(
                        child: TextField(
                          maxLines: 20,
                          style: TextStyle(
                            color: Colors.blue[800],
                            fontSize: 18.0,
                            letterSpacing: 1,
                            wordSpacing: 3,
                          ),
                          controller: _textEditingController,
                          decoration: InputDecoration(
                              border: InputBorder.none,
                              hintStyle: TextStyle(
                                  color: Colors.grey[600], fontSize: 18.0),
                              hintText: 'Enter some text here...'),
                          onChanged: (String newText) {
                            setState(() {
                              text = newText;
                            });
                          },
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                //<----------------Controllers------------------->
                Padding(
                  padding: const EdgeInsets.only(top: 10.0, bottom: 20.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.only(right: 10),
                          child: NeumorphicButton(
                            child: const Text(
                              'SPEAK',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w400),
                            ),
                            onPressed: () {
                              speak();
                            },
                          ),
                        ),
                      ),
                      Expanded(
                        child: Container(
                          padding: const EdgeInsets.only(right: 10),
                          child: NeumorphicButton(
                            child: const Text(
                              'STOP',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w400),
                            ),
                            onPressed: () {
                              tts.stop();
                            },
                          ),
                        ),
                      ),
                      Expanded(
                        child: NeumorphicButton(
                          child: const Text(
                            'CLEAR',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 14,
                                fontWeight: FontWeight.w400),
                          ),
                          onPressed: () {
                            setState(() {
                              _textEditingController.clear();
                              text = '';
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                //<----------------Volume------------------->
                Row(
                  children: <Widget>[
                    Text('Volume', style: TextStyle(color: Colors.blue[700])),
                    const SizedBox(
                      width: 10,
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(left: 20.0, right: 20.0),
                        child: NeumorphicSlider(
                          style: SliderStyle(
                            accent: Colors.blue[800],
                            variant: Colors.blue[400],
                            depth: 5,
                          ),
                          value: volume,
                          min: 0,
                          max: 1,
                          height: 10,
                          onChanged: (double value) {
                            initLanguages();
                            setState(() {
                              volume = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Text('(${volume.toStringAsFixed(2)})',
                        style: TextStyle(color: Colors.blue[400])),
                  ],
                ),
                const SizedBox(
                  height: 15,
                ),
                //<----------------Rate------------------->
                Row(
                  children: <Widget>[
                    Text('Rate', style: TextStyle(color: Colors.blue[700])),
                    const SizedBox(
                      width: 30,
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(left: 20.0, right: 20.0),
                        child: NeumorphicSlider(
                          style: SliderStyle(
                            accent: Colors.blue[800],
                            variant: Colors.blue[400],
                            depth: 5,
                          ),
                          value: rate,
                          min: 0,
                          max: 2,
                          height: 10,
                          onChanged: (double value) {
                            setState(() {
                              rate = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Text('(${rate.toStringAsFixed(2)})',
                        style: TextStyle(color: Colors.blue[400])),
                  ],
                ),
                const SizedBox(
                  height: 15,
                ),
                //<----------------Pitch------------------->
                Row(
                  children: <Widget>[
                    Text('Pitch', style: TextStyle(color: Colors.blue[700])),
                    const SizedBox(
                      width: 30,
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.only(left: 20.0, right: 20.0),
                        child: NeumorphicSlider(
                          style: SliderStyle(
                            accent: Colors.blue[800],
                            variant: Colors.blue[400],
                            depth: 5,
                          ),
                          value: pitch,
                          min: 0,
                          max: 2,
                          height: 10,
                          onChanged: (double value) {
                            setState(() {
                              pitch = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Text('(${pitch.toStringAsFixed(2)})',
                        style: TextStyle(color: Colors.blue[400])),
                  ],
                ),
                const SizedBox(
                  height: 30,
                ),
                //<----------------Language------------------->
                Row(
                  children: <Widget>[
                    Text('Language', style: TextStyle(color: Colors.blue[700])),
                    const SizedBox(
                      width: 20,
                    ),
                    DropdownButton<String>(
                      value: language,
                      icon: const Icon(Icons.arrow_drop_down),
                      iconSize: 24,
                      elevation: 16,
                      style: TextStyle(color: Colors.blue[400]),
                      underline: Container(
                        height: 2,
                        color: Colors.blue[400],
                      ),
                      onChanged: (String? newValue) async {
                        languageCode =
                            await tts.getLanguageCodeByName(newValue!);
                        voice = await getVoiceByLang(languageCode!);
                        setState(() {
                          language = newValue;
                        });
                      },
                      items: languages
                          .map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value),
                        );
                      }).toList(),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 10,
                ),
                //<----------------Voice------------------->
                Row(
                  children: <Widget>[
                    Text('Voice', style: TextStyle(color: Colors.blue[700])),
                    const SizedBox(
                      width: 50,
                    ),
                    Text(voice != null ? 'Active' : 'loading...',
                        style: TextStyle(color: Colors.blue[400])),
                  ],
                ),
                const SizedBox(
                  height: 20,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  //speak text and set state
  void speak() {
    tts.setVolume(volume);
    tts.setRate(rate);
    if (languageCode != null) {
      tts.setLanguage(languageCode!);
    }
    tts.setPitch(pitch);
    tts.speak(text);
  }
}
