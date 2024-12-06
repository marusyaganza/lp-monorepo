export function getErrorMessageFromGQL(result) {
  return result?.body?.singleResult?.errors?.[0]?.message;
}

export function getDataFromGQL(result) {
  return result?.body?.singleResult?.data;
}
