
//0.8+0.4=0.6
//0.8*0.2+0.4*0.6= 0.4/0.8
export default currentGradeAvg = (courseResult) =>{
let assignmentComplete=0;
let result=0;
courseResult.forEach((element) => {
    const complete = 1 * (element.weight);
    const grade = (element.weight * (element.outcome));
    result = result + grade;
    assignmentComplete =assignmentComplete+complete;
  });
  const gradeAvg = (result/assignmentComplete)
  return gradeAvg
}
