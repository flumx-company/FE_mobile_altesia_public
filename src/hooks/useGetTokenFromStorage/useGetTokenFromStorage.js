import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import axios from 'axios';
import { loginSucceed } from '../../redux/auth/action';
/* eslint-disable no-empty */
const useGetTokenFromStorage = () => {
  const dispatch = useDispatch();

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(loginSucceed(token));
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    } catch (e) {}
  };

  useEffect(() => {
    getTokenFromStorage();
  }, []);
};

export default useGetTokenFromStorage;
