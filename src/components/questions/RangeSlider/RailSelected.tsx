import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import COLORS from '../../../assets/colors';

const RailSelected = () => <View style={styles.root} />;

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 5,
    backgroundColor: COLORS.darkBlue,
    borderRadius: 2,
  },
});
