export default function formatDate(UTCDate) {
  const date = new Date(UTCDate);
  function addZeroPadding(value) {
    let clonedValue = value;
    if (String(clonedValue).length === 1) {
      clonedValue = `0${clonedValue}`;
    }
    return clonedValue;
  }
  const day = addZeroPadding(date.getDate());
  const month = addZeroPadding(date.getMonth() + 1);
  return `${day}.${month}.${date.getFullYear()}`;
}

export function calculateAnalytics(operatorsAnalytics) {
  operatorsAnalytics.forEach(operator => {
    let statistics = {
      sumFromMango: 0,
      sumFromSystem: 0,
      averageCallsDuration: 0,
      maxCallDuration: 0,
      averageOnlineTimePerDay: 0,
      allCallsCount: 0,
      resolvedQuestionsCount: 0,
      callsOutcomeCount: 0,
      callsIncomeCount: 0,
      averageMark: 0,
      marksSum: 0,
      daysAmount: operator.kpi.length,
      // specifically for graphs
      unitsAmount: 0,
      twosAmount: 0,
      threesAmount: 0,
      foursAmount: 0,
      fivesAmount: 0,
      // specifically for operator
      resolvedByClient: 0,
      resolvedByOperator: 0
    };

    operator.kpi.forEach(kpi => {
      increaseStatsValues(statistics, kpi);
      statistics.averageCallsDuration += kpi.calls.counts.total * kpi.calls.durations.averageInSeconds;
      if (kpi.calls.durations.maxInSeconds > statistics.maxCallDuration) {
        statistics.maxCallDuration = kpi.calls.durations.maxInSeconds;
      }
      statistics.marksSum += Object.values(kpi.questions.marks.counts).reduce((sum, count) => sum + count);
      statistics.averageMark += Object.values(kpi.questions.marks.counts).reduce((sum, count, index) => {
        return sum + count * (index + 1);
      });
    });
    calculateAverages(statistics);
    assignVariables(operator, statistics);
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

export function fractionalHoursToIntegerHoursAndMinutes(fractionalHours) {
  const hours = Math.trunc(fractionalHours);
  let minutes = ((fractionalHours - hours) * 60).toFixed();
  if (minutes.length === 1) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
}

export const toDateString = (fromDate, toDate) => {
  fromDate = fromDate
    .split(".")
    .reverse()
    .join("-");
  toDate = toDate
    .split(".")
    .reverse()
    .join("-");
  return [fromDate, toDate];
};

// non-export functions
function assignVariables(operator, statistics) {
  operator.calculatedKPI = {
    questions: {
      createdCounts: {
        fromMango: statistics.sumFromMango,
        fromSystem: statistics.sumFromSystem
      },
      resolvedCounts: {
        total: statistics.resolvedQuestionsCount,
        //specifically for operator
        byClient: statistics.resolvedByClient,
        byOperator: statistics.resolvedByOperator
      },
      marks: {
        average: statistics.averageMark,
        counts: {
          //specifically for graphs
          units: statistics.unitsAmount,
          twos: statistics.twosAmount,
          threes: statistics.threesAmount,
          fours: statistics.foursAmount,
          fives: statistics.fivesAmount
        }
      }
    },
    calls: {
      durations: {
        averageInSeconds: statistics.averageCallsDuration,
        maxInSeconds: statistics.maxCallDuration,
        onLineAverageInSeconds: statistics.averageOnlineTimePerDay
      },
      counts: {
        incomes: statistics.callsIncomeCount,
        outcomes: statistics.callsOutcomeCount,
        total: statistics.allCallsCount
      }
    }
  };
}

function increaseStatsValues(statistics, kpi) {
  statistics.sumFromMango += kpi.questions.createdCounts.fromMango;
  statistics.sumFromSystem += kpi.questions.createdCounts.fromSystem;
  statistics.averageOnlineTimePerDay += kpi.calls.durations.onLineAverageInSeconds;
  statistics.resolvedQuestionsCount += kpi.questions.resolvedCounts.total;
  statistics.allCallsCount += kpi.calls.counts.total;
  statistics.callsOutcomeCount += kpi.calls.counts.outcomes;
  statistics.callsIncomeCount += kpi.calls.counts.incomes;
  // specifically for graphs
  statistics.unitsAmount += kpi.questions.marks.counts.units;
  statistics.twosAmount += kpi.questions.marks.counts.twos;
  statistics.threesAmount += kpi.questions.marks.counts.threes;
  statistics.foursAmount += kpi.questions.marks.counts.fours;
  statistics.fivesAmount += kpi.questions.marks.counts.fives;
  // specifically for operator
  statistics.resolvedByClient += kpi.questions.resolvedCounts.byClient;
  statistics.resolvedByOperator += kpi.questions.resolvedCounts.byOperator;
}

function calculateAverages(statistics) {
  statistics.averageCallsDuration =
    statistics.allCallsCount === 0 ? 0 : statistics.averageCallsDuration / statistics.allCallsCount;
  statistics.averageOnlineTimePerDay =
    statistics.daysAmount - 1 === 0 ? 0 : statistics.averageOnlineTimePerDay / (statistics.daysAmount - 1);
  statistics.averageMark = statistics.marksSum === 0 ? 0 : statistics.averageMark / statistics.marksSum;
}
