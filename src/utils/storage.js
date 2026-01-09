import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@osmanli_yapilacaklar';

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Error storing data", e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading data", e);
    return [];
  }
};
