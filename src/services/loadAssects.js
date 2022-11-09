import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

async function loadAssects() {
  await Font.loadAsync({
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    DosisLight: require('../assets/fonts/Dosis-Light.ttf'),
    DosisRegular: require('../assets/fonts/Dosis-Regular.ttf'),
    DosisMedium: require('../assets/fonts/Dosis-Medium.ttf'),
    DosisBold: require('../assets/fonts/Dosis-Bold.ttf'),
  });
  const images = [require('../assets/images/logo.png'), require('../assets/images/event.png'), require('../assets/images/preloader-logo.png')];

  const cacheImages = images.map((image) => Asset.fromModule(image).downloadAsync());
  return Promise.all(cacheImages);
}

export default loadAssects;
