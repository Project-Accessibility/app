import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import COLORS from '../../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const THUMB_RADIUS = 12;
const ICON_SIZE = 25;

const Thumb = () => {
  return (
    <View style={styles.root}>
      <Icon name="angle-left" size={ICON_SIZE} color={COLORS.black} style={styles.icon} />
      <Icon name="angle-right" size={ICON_SIZE} color={COLORS.black} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    width: THUMB_RADIUS * 4,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 0,
    borderColor: COLORS.darkBlue,
    backgroundColor: COLORS.teal,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
  icon: {
    marginBottom: -3,
  },
});

export default memo(Thumb);
