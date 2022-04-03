import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import COLORS from '../../assets/colors';

interface masterProps {
  children: Element | Element[];
}

const MasterContainer = ({ children }: masterProps) => {
  return (
    <SafeAreaView style={styles.masterContainer}>
      <View style={styles.innerMasterContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  innerMasterContainer: {
    padding: 20,
  },
});

export default MasterContainer;
