import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
/* eslint-disable */
const storagePutToken = async (token) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem('token', token);
  } catch (e) {}
};

export const storageRemoveLoginToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    return true;
  } catch (e) {}
};

export const storagePutRegisterToken = async (token) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem('registerToken', token);
  } catch (e) {}
};

export const storageRemoveRegisterToken = async () => {
  try {
    await AsyncStorage.removeItem('registerToken');
  } catch (e) {}
};

export default storagePutToken;
