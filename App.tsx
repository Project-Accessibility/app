import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import React from 'react';
import Header from './src/components/generic/Header';
import HomeScreen from './src/screens/HomeScreen';
import HelpScreen from './src/screens/HelpScreen';
import ACCESSIBILITY_STRINGS from './src/assets/accessibilityStrings';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import { navigationRef } from './src/helpers/rootNavigation';
import SectionScreen from './src/screens/SectionScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import { LogBox } from 'react-native';
import VideoScreen from './src/screens/VideoScreen';
LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef} onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.homeTitle,
          }}
          options={{
            header: () => <Header title={ACCESSIBILITY_STRINGS.homeTitle} hasHelpButton />,
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.helpTitle,
          }}
          options={{
            header: () => <Header title={ACCESSIBILITY_STRINGS.helpTitle} hasBackButton />,
          }}
        />
        <Stack.Screen
          name="Questionnaire"
          component={QuestionnaireScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.questionnaireTitle,
          }}
          options={{
            header: () => (
              <Header
                title={ACCESSIBILITY_STRINGS.questionnaireTitle}
                hasHomeButton
                hasHelpButton
              />
            ),
          }}
        />
        <Stack.Screen
          name="Section"
          component={SectionScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.sectionTitle,
          }}
          options={{
            header: () => (
              <Header title={ACCESSIBILITY_STRINGS.sectionTitle} hasBackButton hasHelpButton />
            ),
          }}
        />
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          initialParams={{
            backRouteName: ACCESSIBILITY_STRINGS.sectionTitle,
          }}
          options={{
            header: () => (
              <Header title={ACCESSIBILITY_STRINGS.questionTitle} hasBackButton hasHelpButton />
            ),
          }}
        />
        <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
