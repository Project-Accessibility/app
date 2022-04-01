import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import COLORS from '../../assets/colors';

interface masterProps {
  children: Element | Element[];
}

const MasterContainer = ({ children }: masterProps) => {
  return <SafeAreaView style={styles.masterContainer}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  masterContainer: {
    padding: 20,
    height: '100%',
    backgroundColor: COLORS.white,
  },
});

export default MasterContainer;
