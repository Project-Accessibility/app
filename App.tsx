/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  //ScrollView,
  //StatusBar,
  //StyleSheet,
  Text,
  // useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  //DebugInstructions,
  //Header,
  //LearnMoreLinks,
  //ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SectionScreen from './src/screens/SectionScreen';
import SplashScreen from './src/screens/SplashScreen';

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = false;
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  //const isDarkMode = false;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //const backgroundStyle = {
  //  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //};

  useEffect(() => {
    // Quick way of showing splashscreen for 3 seconds.
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return <SectionScreen />;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
