import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';
import permissionCheck from '../utility/PermissionCheck';
//@ts-ignore next-line
import Video from 'react-native-video';
import { FileSelectedData } from '../../models/questionOptionExtraData/FileSelectedData';
import getLastItemFromSplit from '../../helpers/splitHelper';

const VideoSelector = (props: {
  value: string | undefined;
  onVideoSelected: (videoPath: FileSelectedData | undefined) => void;
}) => {
  const [video, setVideo] = React.useState<string | undefined>('');
  const [paused, setPaused] = React.useState<boolean>();
  const [fullScreen, setFullScreen] = React.useState(false);

  //Check if video already exists (this is when image is already uplaoded to DB), if so, set correct metadata
  try {
    if (video) {
      props.onVideoSelected({
        uri: video,
        type: `video/${getLastItemFromSplit(video, '.')}`,
        name: getLastItemFromSplit(video, '/'),
      });
    }
  } catch (_) {}

  useEffect(() => {
    if (props.value) setVideo(props.value);
  }, [props.value]);

  const checkResponse = (response: ImagePickerResponse) => {
    //Check for future logging system for response errors
    if (response.didCancel) {
      console.log('Geen video geselecteerd');
    } else if (response.errorCode === 'permission') {
      console.log('Permissie afgewezen');
    } else if (response.errorCode === 'others') {
      console.log(response.errorMessage);
    } else {
      if (response.assets && response.assets[0]) {
        const source = response.assets[0];
        const formDataVideo = {
          uri: source.uri,
          type: source.type,
          name: source.fileName,
        } as FileSelectedData;
        props.onVideoSelected(formDataVideo ?? null);
        setVideo(source.uri);
      }
    }
  };
  const openCamera = () => {
    launchCamera({ mediaType: 'video', quality: 1, includeBase64: false }, (response) => {
      checkResponse(response);
    });
  };
  const pickVideoFromGallery = () => {
    launchImageLibrary({ mediaType: 'video', quality: 1, includeBase64: false }, (response) => {
      checkResponse(response);
    });
  };

  const removeVideo = () => {
    setVideo('');
    props.onVideoSelected(undefined);
  };

  const requestCameraPermission = async () => {
    //check ios camera
    permissionCheck.checkPermission(PERMISSIONS.IOS.CAMERA);

    //check android camera
    permissionCheck.checkPermission(PERMISSIONS.ANDROID.CAMERA);
    openCamera();
  };

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  return (
    <>
      <View style={styles.container}>
        {video ? (
          <>
            <Video
              resizeMode={fullScreen ? 'contain' : 'contain'}
              source={{ uri: video }}
              style={fullScreen ? styles.fullScreenVideo : styles.normalVideo}
              controls={true}
              paused={paused}
              onLoad={() => setPaused(true)}
              accessible={true}
              accessibilityLabel="Video"
            />
            <View style={styles.videoButtons}>
              <Icon
                onPress={() => toggleFullScreen()}
                name={fullScreen ? 'compress' : 'expand'}
                color={COLORS.black}
                size={48}
                accessible={true}
                accessibilityLabel="Verwijder video knop"
              />
              <Icon
                onPress={() => removeVideo()}
                name="remove"
                color={COLORS.black}
                size={48}
                accessible={true}
                accessibilityLabel={fullScreen ? 'Video verkleinen knop' : 'Video vergroten knop'}
              />
            </View>
          </>
        ) : null}
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => requestCameraPermission()}>
            <Icon
              name="video-camera"
              style={styles.rowContainerChild}
              size={48}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => pickVideoFromGallery()}>
            <Icon name="film" style={styles.rowContainerChild} size={48} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fullScreenVideo: {
    height: 500,
    width: '100%',
  },
  normalVideo: {
    height: 250,
    width: '100%',
  },
  videoButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',

    position: 'absolute',
    width: '100%',
    padding: 10,
  },
  rowContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',

    width: '100%',
    padding: 5,
  },
  rowContainerChild: {
    padding: 5,
  },
});

export default VideoSelector;
