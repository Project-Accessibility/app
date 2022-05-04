import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

const Notch = (props: {}) => <View style={styles.root} {...props} />;

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FE6600',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
