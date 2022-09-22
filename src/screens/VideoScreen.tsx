import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
//@ts-ignore next-line
import Video from 'react-native-video';
import COLORS from '../assets/colors';

const VideoScreen = (navigationProp: NavigationProp<any, any>) => {
  return (
    <Video
      style={styles.video}
      //@ts-ignore next-line
      source={{ uri: navigationProp.route.params.uri }}
      controls={true}
      accessible={true}
      accessibilityLabel="Video"
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.black,
  },
});

export default VideoScreen;
