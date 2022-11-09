import React from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import UiBtn from '../../components/buttons/ui-btn/ui-btn';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import routes from '../../routes';
import { agreeTermsCondition } from '../../redux/auth/action';

const TermsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleNavigateRegister = () => navigation.navigate(routes.loginSingUp.register);
  const handleAgree = () => {
    dispatch(agreeTermsCondition());
    navigation.navigate(routes.loginSingUp.register);
  };
  return (
    <ScreenContainer>
      <ScreenTitle title="Terms & Conditions" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget in pretium nulla lacus, convallis mauris. Suspendisse sodales parturient sit quam turpis. Cursus ac aliquet at ornare vitae molestie pharetra molestie faucibus. Et scelerisque vulputate consectetur pellentesque malesuada id egestas posuere. Consectetur id elementum varius volutpat, iaculis. Lectus tellus etiam justo, pharetra tortor. Sed tristique tristique quisque pellentesque. Odio montes, pharetra at tortor gravida accumsan proin. Scelerisque posuere pretium nam ut massa nec, sollicitudin. Habitant tristique pretium quis nibh ipsum amet gravida id. Lectus diam ac scelerisque eget faucibus ac duis. Malesuada lorem libero, eget facilisi nulla tellus cursus. Aliquet in posuere auctor mauris sapien aenean gravida dui.\n'}
        </Text>
        <Text style={styles.text}>
          {'Interdum ac suspendisse nisl, etiam tortor justo adipiscing nibh enim. Mauris amet, blandit id faucibus felis commodo. Lobortis id sed gravida pretium aliquet. Risus quis eu libero consequat mauris molestie. Accumsan, enim, egestas consectetur quis ut tempus. Amet, ipsum blandit sed urna ipsum condimentum risus pellentesque. Mi, amet velit, duis ut quis. Egestas donec morbi id fames. Nisl, orci lectus eget sed purus donec in amet eu. Mattis gravida morbi facilisis non.\n'}
        </Text>
        <Text style={styles.text}>
          {'Ut mi pellentesque suspendisse in curabitur. In eget diam egestas vel proin a nunc. Quisque dictum venenatis nisi purus. Quisque et pellentesque consectetur integer ac urna elementum, sed. Mattis odio leo sit donec. Scelerisque condimentum amet eget scelerisque quis egestas. Dignissim eget lacus, rutrum a, lacus tempus tellus arcu. Ipsum commodo ante quam aliquam semper.\n'}
        </Text>
        <Text style={styles.text}>
          {'Proin bibendum velit viverra sem lorem. Egestas morbi libero dictum arcu nunc. Lacus, tellus bibendum lectus nisl, aenean lacus, cum turpis adipiscing. Neque, at neque fringilla hendrerit vel porttitor in viverra. Lacus, maecenas fames augue ultrices fringilla nibh porttitor. Aliquet tellus viverra nunc nulla ultricies enim enim egestas. Eu nibh accumsan et faucibus gravida. In tincidunt non mauris cum turpis at lectus. Nulla turpis tempor risus nulla. A, odio quisque maecenas ut. '}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <UiBtn text="BACK" btnStyles={styles.backBtn} textStyles={styles.backBtnText} onPress={handleNavigateRegister} />
        <UiBtn text="OK" btnStyles={styles.okBtn} onPress={handleAgree} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 15,
  },
  text: {
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
    fontSize: 16,
    lineHeight: 22.4,
    textAlign: 'justify',
    marginBottom: -15,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  okBtn: {
    marginBottom: 10,
    width: '45%',
  },
  backBtn: {
    backgroundColor: colors.transparent,
    borderColor: colors.primaryActive,
    borderWidth: 1,
    width: '45%',
  },
  backBtnText: {
    color: colors.primaryActive,
  },
});

export default TermsScreen;
