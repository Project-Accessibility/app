import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import COLORS from '../../../assets/colors';

const Notch = ({ ...props }) => <View style={styles.root} {...props} />;

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.teal,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
