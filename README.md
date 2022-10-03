# SUBANKAMO_SWEN325_A2_2022

## Authors
@subankamo

## PURPOSE of 'TRACK' 
The application will allow users to manage their assessment items, timetable, grades and goals in a singular application. 
Additionally, the aforementioned processes presented in the application will be reimagined to include the influences of agile methodology and tools to enhance user engagement and outcome. 
The application’s main purpose is to make managing academic workload more convenient by packaging commonly used tools in one application,  increase student interest and achievement in learning by reducing common barriers (e.g. stress, unawareness of tools, bad study habits) and introduce students to industry tools and functions (Agile commonly used in various industries) .

## SOLVES
Many students struggle to maintain a healthy balance between personal and academic commitments. 
This is often attributed to poor planning, procrastination caused by perceiving assessment items as insurmountable (mismanagement of time/task) and lack of experience directing personal progress.
This application will equip students with the tools to manage deadlines and goals in one application (reducing the complexity of navigating multiple solutions). The provided suite of tools aims to support the user learning process by teaching students how to break assessment items into achievable tasks, keep track of progress on assessment items and ensure they are holding themselves accountable to their goals.

## FEATURES
-Assessment manager: Users can record assessments creating an ‘Action’ board (kanban board). From here, they are encouraged to break these stories down into achievable tasks and track their progress by selecting valid states (To-do, In-progress, complete).
      
    Possible actions:
    - Add assignment
    - Remove assignment
    - Sort assignment by value
    - Add task to assignment
    - Remove task from assignment
    - set task state
    - track task state and assignment progress
 
-Result manager: Users can record their grades from their assessments (track academic progress) and calculate what grades they need to achieve in future assessments to reach their goals.

    Possible actions:
    - Add course
    - Remove course
    - Add result to course
    - Remove result from course
    - Set desire course outcome
    - Calculate needed results to meet desired outcome
    - Sort course by value
 
-Goal manager: Users can record their goals then encouraged notified to reflect on their progress to ensure they stay accountable to their academic/personal goals.

    Possible actions:
    - Add goal
    - Remove goal
    - Add log to goal
    - Remove log from goal
    - filter goal by state
    - track state of goals
    - track frequency of logs

## TECH STACK
React native, firebase

## PRE-REQUISITE
This is react-native app, so please refer to the following doc to install dependencies.
https://reactnative.dev/docs/environment-setup

This app was tested using the 'Expo Go' app - due to limitations of storage - therefore the UI is only configured to the specification of an iphone 12.
Usage on other devices (other iphone models or android) may result in unexpected behaviour.
To use the application please download 'Expo Go' at https://apps.apple.com/us/app/expo-go/id982107779

## RUN LOCALLY
Clone the project into a directory of choice
```bash
git clone https://gitlab.ecs.vuw.ac.nz/subankamo/subankamo_swen325_a2_2022.git
```

Go to the project directory
```bash
cd subankamo_swen325_a2_2022
cd SWEN325_A1_TRACK
```

Open in Visual Studios
```bash
#Add Bash alias in .bash_profile 
alias code="open -a /Applications/Visual\ Studio\ Code.app"
#Open Visual Studio Code by command
code .
```

create new terminal in VS and Install dependencies
```bash
    npm install
```
Run server
```bash
    npm start
```
Scan QR code on phone camera app
```bash
    press go to expo app
```
Expected behaviour: the application 'Track' should be loaded onto the expo go app screen
