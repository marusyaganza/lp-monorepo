type UserDataType = {
  token: string;
  userId: string;
  expiration: string;
};

export const getUserData = (): UserDataType | undefined => {
  let storedData;

  const userData = localStorage.getItem('userData') || '';

  if (userData) {
    storedData = JSON.parse(userData) as UserDataType;
  }
  return storedData;
};
