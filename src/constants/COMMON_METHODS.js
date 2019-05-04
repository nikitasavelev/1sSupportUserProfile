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
    averageMark
  ) {
    operator.calculatedKPI = {};
    operator.calculatedKPI.questions = {};
    operator.calculatedKPI.questions.createdCounts = {};
    operator.calculatedKPI.questions.resolvedCounts = {};
    operator.calculatedKPI.questions.marks = {};
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

      operator.kpi.forEach(kpi => {
        sumFromMango += kpi.questions.createdCounts.fromMango;
        sumFromSystem += kpi.questions.createdCounts.fromSystem;
        averageCallsDuration +=
          kpi.calls.counts.total * kpi.calls.durations.averageInSeconds;
        if (kpi.calls.durations.maxInSeconds > maxCallDuration) {
          maxCallDuration = kpi.calls.durations.maxInSeconds;
        }
        averageOnlineTimePerDay += kpi.calls.durations.onLineAverageInSeconds;
        resolvedQuestionsCount += kpi.questions.resolvedCounts.total;
        allCallsCount += kpi.calls.counts.total;
        callsOutcomeCount += kpi.calls.counts.outcomes;
        callsIncomeCount += kpi.calls.counts.incomes;
        marksSum += Object.values(kpi.questions.marks.counts).reduce(
          (sum, count) => sum + count
        );
        averageMark +=
          kpi.questions.marks.counts.units +
          kpi.questions.marks.counts.twos * 2 +
          kpi.questions.marks.counts.threes * 3 +
          kpi.questions.marks.counts.fours * 4 +
          kpi.questions.marks.counts.fives * 5;
      });
      // averages
      averageCallsDuration = (daysAmount - 1) === 0 ? 0 : averageCallsDuration / (daysAmount - 1);
      averageOnlineTimePerDay = (daysAmount - 1) === 0 ? 0 : averageOnlineTimePerDay / (daysAmount - 1);
      averageMark = marksSum === 0 ? 0 : (averageMark / marksSum);
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
        averageMark
      );
    });
  }