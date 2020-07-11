import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
  try {
    const item = {
      value, // value: value
      timeStamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value); // Object

    // 1st Scenario
    if (!item) return null;

    // 2nd Scenario
    if (isExpired(item)) {
      // clean it from cache
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    // 3rd Scenario
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timeStamp);
  return now.diff(storedTime, "minutes") > expiryInMinutes; // boolean value
};

export default {
  store,
  get,
};
