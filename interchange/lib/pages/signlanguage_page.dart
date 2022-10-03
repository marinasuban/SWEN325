//IMPORTS
import 'package:flutter/services.dart';
import 'package:camera/camera.dart';
import 'package:interchange/main.dart';
import 'package:tflite/tflite.dart';
import 'package:text_to_speech/text_to_speech.dart';
import 'package:flutter_neumorphic/flutter_neumorphic.dart';

//SCREEN
class SignLanguagePage extends StatefulWidget {
  const SignLanguagePage({Key? key}) : super(key: key);

  @override
  State<SignLanguagePage> createState() => _SignLanguagePageState();
}

//UI
class _SignLanguagePageState extends State<SignLanguagePage> {
  //HOLDS TEXT TO SPEECH
  TextToSpeech tts = TextToSpeech();

  //HOLDS CURRENT FRAME
  CameraImage? _cameraImage;

  //CONTROLS CAMERA IN DEVICE
  CameraController? _cameraController;

  //TURN ON AND OFF SERVICE
  bool _translationActive = false;

  //SIGN TO TEXT TRANSLATION
  String _recordedTranslation = '';

  //LAST CHARACTER TRANSLATED
  String _previousPrediction = ' ';

  //LOAD CAMERA IN DEVICE
  void loadCamera() {
    //GET CAMERA
    _cameraController = CameraController(cameras![0], ResolutionPreset.medium);
    //INITIALISE CAMERA
    _cameraController!.initialize().then((value) {
      //if camera not ready - do nothing, else start displaying imagestream and predictions
      if (!mounted) {
        return;
      } else {
        setState(() {
          _cameraController!.startImageStream((imageStream) {
            _cameraImage = imageStream;
            runModel();
          });
        });
      }
    });
  }

  void speak() {
    tts.speak(_recordedTranslation);
  }

  //Runs prediction model on current frame
  Future<void> runModel() async {
    //if there is a frame from the camera and the service is requested make predictions
    if (_cameraImage != null && _translationActive) {
      var predictions = await Tflite.runModelOnFrame(
          bytesList: _cameraImage!.planes.map((plane) {
            return plane.bytes;
          }).toList(),
          imageHeight: _cameraImage!.height,
          imageWidth: _cameraImage!.width,
          threshold: 0.2,
          numResults: 1,
          asynch: true);
      //if the prediction isn't none and not repeating the same prediction (different sign) add translation to record
      for (var element in predictions!) {
        setState(() {
          if (element['label'].toString() != '3 None' &&
              element['label'].toString() != _previousPrediction) {
            var predict = element['label'].toString().substring(2);
            _recordedTranslation = '$_recordedTranslation $predict';
            _previousPrediction = element['label'];
          }
        });
      }
    }
  }

  //dispose all streams
  @override
  void dispose() {
    _cameraController!.dispose();
    super.dispose();
  }

  //CAMERA PREVIEW
  Widget videoVisible() {
    //if the camera isn't initialized or the service is off don't show camera preview
    if (!_cameraController!.value.isInitialized || !_translationActive) {
      return RotatedBox(
          quarterTurns: 1,
          child: Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/video_off.jpeg'),
                fit: BoxFit.fill,
              ),
            ),
          ));
    } else {
      return AspectRatio(
        aspectRatio: _cameraController!.value.aspectRatio,
        child: CameraPreview(_cameraController!),
      );
    }
  }

  //LOAD ML MODEL
  Future<void> loadModel() async {
    await Tflite.loadModel(
        model: "assets/model_unquant.tflite", labels: "assets/labels.txt");
  }

  //LOAD COMPONENTS
  @override
  void initState() {
    super.initState();
    runService();
  }

  //LOAD CAMERA AND MODEL
  void runService() {
    loadCamera();
    loadModel();
  }

  //STOP CAMERA
  stopService() {
    _cameraController?.stopImageStream();
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
                  Row(
                    children: [
                      const Spacer(),
                      //++++DESCRIPTION++++
                      Text(
                        'CAMERA ON/OFF:',
                        style: TextStyle(
                          color: Colors.blue[800],
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      //++++TOGGLE-SERVICE++++
                      Switch(
                          value: _translationActive,
                          activeColor: Colors.blue[400],
                          inactiveTrackColor: Colors.blueGrey[200],
                          onChanged: (bool value) {
                            setState(() {
                              _translationActive = value;
                            });
                            _translationActive ? stopService : runService();
                          }),
                    ],
                ),
                const SizedBox(
                  height: 10,
                ),
                //<----------------Model------------------->
                  RotatedBox(
                    quarterTurns: 3,
                    //++++CAMERA++++
                    child: Neumorphic(
                      child: SizedBox(
                        height: MediaQuery.of(context).size.height * 0.7,
                        width: MediaQuery.of(context).size.width * 0.6,
                        child: videoVisible(),
                      ),
                    ),
                  ),
                //++++TRANSLATION++++
                Padding(
                  padding: const EdgeInsets.only(top: 15.0, bottom: 15.0),
                  child: Neumorphic(
                    style: const NeumorphicStyle(
                      color: Colors.white70,
                    ),
                    child: SizedBox(
                      height: 260,
                      width: 400,
                      child: Column(children: [
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: Expanded(
                            child: SingleChildScrollView(
                              scrollDirection: Axis.vertical,
                              child: Text(
                                _recordedTranslation,
                                textAlign: TextAlign.left,
                                style: TextStyle(
                                  color: _translationActive
                                      ? Colors.blue[400]
                                      : Colors.blue[800],
                                  fontWeight: FontWeight.bold,
                                  fontSize: 22.0,
                                  letterSpacing: 3,
                                  wordSpacing: 3,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ]),
                    ),
                  ),
                ),
                //<----------------Translation Controller------------------->
                Row(
                  children: <Widget>[
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.only(right: 10),
                        child: NeumorphicButton(
                          onPressed: () {
                            setState(() {
                              _recordedTranslation = '';
                            });
                          },
                          child: const Text('CLEAR',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 14,
                                fontWeight: FontWeight.w400),),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.only(right: 10),
                        child: NeumorphicButton(
                          onPressed: () {
                            setState(() {
                              _recordedTranslation = '$_recordedTranslation\n';
                            });
                          },
                          child: const Text('BREAK',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 14,
                                fontWeight: FontWeight.w400),),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.only(right: 10),
                        child: NeumorphicButton(
                          onPressed: () {
                            Clipboard.setData(
                                ClipboardData(text: _recordedTranslation));
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Copied to Clipboard'),
                              ),
                            );
                          },
                          child: const Text('COPY',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 14,
                                fontWeight: FontWeight.w400),),
                        ),
                      ),
                    ),
                    Expanded(
                      child: NeumorphicButton(
                        onPressed: (){speak();},
                        child: const Text('SPEAK',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              color: Colors.black,
                              fontSize: 14,
                              fontWeight: FontWeight.w400),),
                      ),
                    ),
                  ],
                ),
                //<----------------NAV------------------->
              ],
            ),
          ),
        ),
      ),
    );
  }
}
