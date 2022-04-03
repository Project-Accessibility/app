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
import SectionScreen from './src/screens/SectionScreen';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Quick way of showing splashscreen for 3 seconds.
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return <SectionScreen />;
};

export default App;
