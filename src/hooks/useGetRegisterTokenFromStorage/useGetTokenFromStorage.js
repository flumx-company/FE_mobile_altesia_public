import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import axios from 'axios';
import { putProfileSucceed } from '../../redux/auth/action';
/* eslint-disable no-empty */
const useGetRegisterTokenFromStorage = () => {
  const dispatch = useDispatch();

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('registerToken');
      if (token) {
        dispatch(putProfileSucceed(token));
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    } catch (e) {}
  };

  useEffect(() => {
    getTokenFromStorage();
  }, []);
};

export default useGetRegisterTokenFromStorage;
