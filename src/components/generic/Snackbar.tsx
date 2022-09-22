import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../../assets/colors';

const Divider = () => {
  useEffect(() => {
    // @ts-ignore
    console.log(`snackbar: ${global.snackBar}`);
    // @ts-ignore
    if (global.snackBar === false) return;
  });

  return (
    <View style={styles.snackbar}>
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: COLORS.darkBlue,
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    width: '100%',
    padding: 10,
  },
});

export default Divider;
