import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import COLORS from '../../assets/colors';

interface masterProps {
  children: Element | Element[];
}

const MasterContainer = ({ children }: masterProps) => {
  return (
    <SafeAreaView style={styles.masterContainer}>
      <ScrollView>
        <View style={styles.innerMasterContainer}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  innerMasterContainer: {
    paddingHorizontal: 20,
    top: 10,
  },
});

export default MasterContainer;
