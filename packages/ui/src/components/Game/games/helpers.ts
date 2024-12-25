function formatString(str: string): string {
  return str.trim().toLocaleLowerCase();
}

export function checkTextAnswer(
  val: string,
  corrrectAnswer: string[]
): boolean {
  return corrrectAnswer?.map(formatString).includes(formatString(val));
}

export function checkMultipleAnswers(
  val: string[],
  corrrectAnswer: string[]
): boolean {
  if (val?.length !== corrrectAnswer?.length) {
    return false;
  }
  const formattedValues = val.map(formatString);
  const isCorrect = corrrectAnswer
    .map(formatString)
    .every((answer, i) => formattedValues[i] === answer);
  return isCorrect;
}
