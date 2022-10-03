//ratio of goal in each state
export default progressRatio = (goalList, value) => {
  let listsLength = goalList.length;
  let ratioLength = goalList.filter((goal) => goal.progress === value).length;
  let ratio = ratioLength / listsLength;
  if (isNaN(ratio)) {
    return 0;
  } else {
    return ratio;
  }
};
