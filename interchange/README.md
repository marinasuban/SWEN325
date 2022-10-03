# Interchange

## Authors
@subankamo

## PURPOSE of 'Interchange' 
This application will allow users to communicate without barriers by allowing individuals with different communication mode preferences to interchange thoughts and ideas in ways they are most comfortable outputing and receiving. The modes of communication that this application can translate is sign language, speech, and text.
The application main purpose is to make communicating easier for individuals who may have different preferences/needs to tranditional modes of communication (speech) allowing them to express themselves in a form that they are most comfortable and allowing the other party to receive this output in a form they prefer (vice-versa). 
This solution has been specifically designed for a neurodivergent and/or disabled (e.g hearing impaired, blind) audience and features a simplistic neumorphic design to reduce possible overstimulation and promotes ease of navigation.

## SOLVES
Traditional translators fail to recognise that both parties in a conversation may have specific needs when communicating most limiting feedback to text - Interchange is a solution that reduces these barriers by providing a way for user to express themselves freely and receive feedback in a format they prefer.
This application will equip users with the tools to communicate in different formats within one application (reducing the complexity of navigating multiple solutions). 
The provided suite of tools aims to support the communication by allowing them to express themselves and understand sign, text or speech.

## FEATURES
-SIGN: Users can translate sign language to text or speech 
>Designed to: understand hearing impaired users [speech/text]
      
    Possible actions:
    - Turn on/off camera
    - Translate sign language in camera feed to text 
    - Copy, Clear, Break or annotate text
 
-SPEECH: Users can translate speech into text 
>Designed to: communicate to those who may have textual preferences e.g autistic [reduce overstimulation], neurodivergent (e.g adhd) [reduce audio distractor], or hearing impaired user [visual text]

    Possible actions:
    - Turn on/off microphone
    - Translate speech recorded by microphone to text 
    - Copy, Clear and adjust text size
 
-TEXT: Users can translate text to speech
>Designed to: communicate to those who have verbal preferences for those who may have verbal limitation e.g neurotypical [traditional conversation format], visually impaired [audio], language limitation (understand speech but not text)

    Possible actions:
    - Turn on/off speaker
    - Annotate text to sound 
    - Modify voice using pitch, volume or rate

-PERSONAL: Users can communicate communication preferences non-verbally, get help using app features and signout of their account.

    Possible actions:
    - Modify introduction card (Used to concisely communicate communication preference to secondary party).
    - Get help with the app functions.
    - Logout of account.
    - Update and retrieve information used in introduction card from database.

## TECH STACK
Flutter, Dart, Firebase

## PRE-REQUISITE
This is flutter project, so please refer to the following doc to install dependencies.
https://docs.flutter.dev/get-started/install

This app was tested using android studio - due to limitations of storage the UI is only configured to the specification of an Pixel 6.
Usage on other devices (other iphone models or android) may result in unexpected behaviour.
To use the IDE download 'android studios' at https://developer.android.com/studio

## RUN LOCALLY
Clone the project into a directory of choice
```bash
git clone https://gitlab.ecs.vuw.ac.nz/course-work/swen325/2022/assignment3/subankamo/interchange.git
```

Go to the project directory
```bash
cd interchange
```

Open in Android Studios
```bash
#Add Bash alias in .bash_profile 
alias code="open -a /Applications/Android\ Studio.app"
#Open Android Studio Code by command
code .
```

create new terminal in Android Studio and Install dependencies
```bash
    flutter pub get
```
Set up emulator 

1. create a device with the following specs and start
    ![Screen_Shot_2022-10-03_at_12.07.25_AM](/uploads/a77c1a71c2b3a422b578434da5a08365/Screen_Shot_2022-10-03_at_12.07.25_AM.png)
    ![Screen_Shot_2022-10-03_at_12.07.48_AM](/uploads/659992f3d6dd2b3e68019d83727bf8e6/Screen_Shot_2022-10-03_at_12.07.48_AM.png)
    
2. after starting device in the 3 dot icon enable microphone input from computer
    ![Screen_Shot_2022-10-03_at_1.05.38_AM](/uploads/0a09ad05ac67f9d05f2fad84ad1e8695/Screen_Shot_2022-10-03_at_1.05.38_AM.png)
    
Start App (press play button or alternative use terminal)
```bash
    flutter run
```
Expected behaviour: the application 'Interchange' should be loaded onto the screen of the emulated device
