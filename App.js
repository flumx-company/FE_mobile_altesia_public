// import 'react-native-gesture-handler';
import React, {useState} from 'react';
import AppRouting from "./src/routing/routing";
import AppLoading from "expo-app-loading";
import loadAssects from "./src/services/loadAssects";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Toast from "react-native-toast-notifications";
import ToastNotification from './src/components/toast-notification/toast-notification';
import Loader from './src/components/loader/loader';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if(!isReady){
    return (
          <AppLoading
            startAsync={loadAssects}
            onFinish={() => setIsReady(true)}
            onError={(err) => console.warn(err)}
        />
    )
  }
  return (
      <Provider store={store}>
          <AppRouting />
          <Loader />
          <Toast
            ref={(ref) => global['toast'] = ref}
            placement="top"
            duration={2500}
            animationType='slide-in'
            animationDuration={250}
            renderToast={(toastOptions) => <ToastNotification options={toastOptions}/>}
          />
      </Provider>
  );
}
