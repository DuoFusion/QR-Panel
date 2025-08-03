import { STORAGE_KEYS } from "../constants";

export const stringify = (value: any): string => {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};
export const getStorage = () => {
  return localStorage;
};

//get token
export const getToken = () => {
  const storage = getStorage();
  const token = storage.getItem(STORAGE_KEYS.TOKEN);
  return token;
};
