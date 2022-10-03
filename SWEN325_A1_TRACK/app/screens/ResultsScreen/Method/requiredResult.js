
import remainingAssignment from "./remainingAssignment";
import translateGradeToNum from "./translateGradeToNum";

//required percentage of remaing course to achieve desired outcome
export default requiredResult = (course) => {
    let desiredGrade = translateGradeToNum(course.desiredOutcome);
    let resultsObtained = currentResult(course.results);
    let assignmentRemaining = remainingAssignment(course.results);
    let percentageToResult = desiredGrade - resultsObtained;
    let neededPercentage = (percentageToResult / assignmentRemaining) * 100;
    return neededPercentage;
    
  };

//percentage achieved of completed assignments
currentResult = (courseResult) => {
    let resultObtained = 0;
    courseResult.forEach((element) => {
      const grade = (element.weight * element.outcome) / 100;
      resultObtained = resultObtained + grade;
    });
    return resultObtained;
  };