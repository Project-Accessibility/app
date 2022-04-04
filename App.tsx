import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Header from './src/components/generic/Header';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import HelpScreen from './src/screens/HelpScreen';
import ACCESSIBILITY_STRINGS from './src/assets/accessibilityStrings';
import { navigationRef } from './src/helpers/rootNavigation';
import SectionScreen from './src/screens/SectionScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Quick way of showing splashscreen for 3 seconds.
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.homeTitle,
          }}
          options={{
            header: () => <Header title="HomeScreen" hasHelpButton />,
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.helpTitle,
          }}
          options={{
            header: () => <Header title="HelpScreen" hasBackButton />,
          }}
        />
        <Stack.Screen
          name="Section"
          component={SectionScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.helpTitle,
          }}
          options={{
            header: () => <Header title="SectionScreen" hasBackButton />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
