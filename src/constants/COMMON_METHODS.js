export default function formatDate(UTCDate) {
  const date = new Date(UTCDate);
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}

export function assignVariables(
  operator,
  sumFromMango,
  sumFromSystem,
  averageCallsDuration,
  maxCallDuration,
  averageOnlineTimePerDay,
  allCallsCount,
  resolvedQuestionsCount,
  callsOutcomeCount,
  callsIncomeCount,
  averageMark,
  //specifically for graphs
  unitsAmount,
  twosAmount,
  threesAmount,
  foursAmount,
  fivesAmount,
  //specifically for operator
  resolvedByClient,
  resolvedByOperator
) {
  operator.calculatedKPI = {};
  operator.calculatedKPI.questions = {};
  operator.calculatedKPI.questions.createdCounts = {};
  operator.calculatedKPI.questions.resolvedCounts = {};
  operator.calculatedKPI.questions.marks = {};
  operator.calculatedKPI.questions.marks.counts = {};
  operator.calculatedKPI.calls = {};
  operator.calculatedKPI.calls.durations = {};
  operator.calculatedKPI.calls.counts = {};

  operator.calculatedKPI.questions.createdCounts.fromMango = sumFromMango;
  operator.calculatedKPI.questions.createdCounts.fromSystem = sumFromSystem;
  operator.calculatedKPI.calls.durations.averageInSeconds = averageCallsDuration;
  operator.calculatedKPI.calls.durations.maxInSeconds = maxCallDuration;
  operator.calculatedKPI.calls.durations.onLineAverageInSeconds = averageOnlineTimePerDay;
  operator.calculatedKPI.questions.resolvedCounts.total = resolvedQuestionsCount;
  operator.calculatedKPI.calls.counts.total = allCallsCount;
  operator.calculatedKPI.calls.counts.outcomes = callsOutcomeCount;
  operator.calculatedKPI.calls.counts.incomes = callsIncomeCount;
  operator.calculatedKPI.questions.marks.average = averageMark;

  //specifically for graphs
  operator.calculatedKPI.questions.marks.counts.units = unitsAmount;
  operator.calculatedKPI.questions.marks.counts.twos = twosAmount;
  operator.calculatedKPI.questions.marks.counts.threes = threesAmount;
  operator.calculatedKPI.questions.marks.counts.fours = foursAmount;
  operator.calculatedKPI.questions.marks.counts.fives = fivesAmount;
  //specifically for operator
  operator.calculatedKPI.questions.resolvedCounts.byClient = resolvedByClient;
  operator.calculatedKPI.questions.resolvedCounts.byOperator = resolvedByOperator;
}

export function calculateAnalytics(operatorsAnalytics) {
  operatorsAnalytics.forEach(operator => {
    let sumFromMango = 0;
    let sumFromSystem = 0;
    let averageCallsDuration = 0;
    let maxCallDuration = 0;
    let averageOnlineTimePerDay = 0;
    let allCallsCount = 0;
    let resolvedQuestionsCount = 0;
    let callsOutcomeCount = 0;
    let callsIncomeCount = 0;
    let averageMark = 0;
    let marksSum = 0;
    let daysAmount = operator.kpi.length;

    // specifically for graphs
    let unitsAmount = 0;
    let twosAmount = 0;
    let threesAmount = 0;
    let foursAmount = 0;
    let fivesAmount = 0;

    // specifically for operator
    let resolvedByClient = 0;
    let resolvedByOperator = 0;

    operator.kpi.forEach(kpi => {
      sumFromMango += kpi.questions.createdCounts.fromMango;
      sumFromSystem += kpi.questions.createdCounts.fromSystem;
      averageCallsDuration += kpi.calls.counts.total * kpi.calls.durations.averageInSeconds;
      if (kpi.calls.durations.maxInSeconds > maxCallDuration) {
        maxCallDuration = kpi.calls.durations.maxInSeconds;
      }
      averageOnlineTimePerDay += kpi.calls.durations.onLineAverageInSeconds;
      resolvedQuestionsCount += kpi.questions.resolvedCounts.total;
      allCallsCount += kpi.calls.counts.total;
      callsOutcomeCount += kpi.calls.counts.outcomes;
      callsIncomeCount += kpi.calls.counts.incomes;
      marksSum += Object.values(kpi.questions.marks.counts).reduce((sum, count) => sum + count);
      averageMark +=
        kpi.questions.marks.counts.units +
        kpi.questions.marks.counts.twos * 2 +
        kpi.questions.marks.counts.threes * 3 +
        kpi.questions.marks.counts.fours * 4 +
        kpi.questions.marks.counts.fives * 5;

      // specifically for graphs
      unitsAmount += kpi.questions.marks.counts.units;
      twosAmount += kpi.questions.marks.counts.twos;
      threesAmount += kpi.questions.marks.counts.threes;
      foursAmount += kpi.questions.marks.counts.fours;
      fivesAmount += kpi.questions.marks.counts.fives;

      // specifically for operator
      resolvedByClient += kpi.questions.resolvedCounts.byClient;
      resolvedByOperator += kpi.questions.resolvedCounts.byOperator;
    });
    // averages
    averageCallsDuration = allCallsCount === 0 ? 0 : averageCallsDuration / allCallsCount;
    averageOnlineTimePerDay = daysAmount - 1 === 0 ? 0 : averageOnlineTimePerDay / (daysAmount - 1);
    averageMark = marksSum === 0 ? 0 : averageMark / marksSum;
    // assignments
    assignVariables(
      operator,
      sumFromMango,
      sumFromSystem,
      averageCallsDuration,
      maxCallDuration,
      averageOnlineTimePerDay,
      allCallsCount,
      resolvedQuestionsCount,
      callsOutcomeCount,
      callsIncomeCount,
      averageMark,
      //specifically for graphs
      unitsAmount,
      twosAmount,
      threesAmount,
      foursAmount,
      fivesAmount,
      //specifically for operator
      resolvedByClient,
      resolvedByOperator
    );
  });
}

export function setLocalStorageValues(namesArray, valuesObject) {
  namesArray.forEach(name => {
    localStorage.setItem(name, valuesObject[name]);
  });
}

export function removeLocalStorageValues(namesArray) {
  namesArray.forEach(name => {
    localStorage.removeItem(name);
  });
}

export function fractionalHoursToIntegerHoursAndMinutes(fractionalHours){
  const hours = Math.trunc(fractionalHours);
  let minutes = ((fractionalHours - hours) * 60).toFixed();
  if (minutes.length === 1) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
}