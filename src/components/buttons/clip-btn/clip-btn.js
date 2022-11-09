import React from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import ClipIcon from '../../icons/clip-icon';
import fonts from '../../../constants/fonts';
import colors from '../../../constants/colors';

const ClipBtn = ({
  onPress = () => {}, text, insideBlock, btnStyles, disabled,
}) => (
  <View style={styles.browseContainer}>
    <Text style={styles.browseTitle}>
      {text}
    </Text>
    <TouchableOpacity
      style={insideBlock ? { ...styles.browseBtn, ...styles.browseBtnInsideBlock, ...btnStyles } : styles.browseBtn}
      onPress={disabled ? () => {} : onPress}
    >
      <ClipIcon />
      <Text style={styles.browseBtnText}>
        Browse
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  browseContainer: {
    width: '100%',
  },
  browseTitle: {
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
    marginBottom: 5,
  },
  browseBtn: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 92,
    paddingLeft: 25,
    borderRadius: 4,
    backgroundColor: colors.bgSecondary,
  },
  browseBtnInsideBlock: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginBottom: 0,
  },
  browseBtnText: {
    marginLeft: 22,
    fontSize: 18,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
});

export default ClipBtn;
