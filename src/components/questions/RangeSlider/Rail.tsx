import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import COLORS from '../../../assets/colors';

const Rail = () => <View style={styles.root} />;

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 5,
    borderRadius: 2,
    backgroundColor: COLORS.darkBlue,
  },
});
