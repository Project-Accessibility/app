import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import ImageUpload from '../components/question/ImageUpload';

const ComponentsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageUpload />
    </SafeAreaView>
  );
};

export default ComponentsScreen;
