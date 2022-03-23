import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import COLORS from '../assets/colors';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Image
            style={styles.bottomImage}
            source={require('../assets/images/logos/icon_accessibility_on-blue_transp.png')}
          />
          <Text style={styles.bottomText}>Accessibility</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: '10%',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomImage: {
    width: 40,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginRight: 10,
  },
  bottomText: {
    color: COLORS.white,
    fontSize: 40,
    fontFamily: 'Muli-ExtraBold',
  },
});

export default SplashScreen;
