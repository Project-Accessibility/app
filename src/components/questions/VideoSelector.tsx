import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';
import permissionCheck from '../utility/PermissionCheck';
import Video from 'react-native-video';
import { FileSelectedData } from '../../models/questionOptionExtraData/FileSelectedData';

const VideoSelector = (props: {
  value: string | undefined;
  onVideoSelected: (base64Video: FileSelectedData| undefined) => void;
}) => {
  const [video, setVideo] = React.useState<string | undefined>('');

  useEffect(() => {
    if (props.value) setVideo(props.value);
  }, [props.value]);

  const checkResponse = (response: ImagePickerResponse) => {
    //Check for future logging system for response errors
    console.log(response);
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

  return (
    <>
      <View style={styles.container}>
        {video ? (
          <>
            <Video source={{uri: video}}   // Can be a URL or a local file.                                     // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles.backgroundVideo} />
            <Icon
              onPress={() => removeVideo()}
              name="remove"
              style={styles.icon}
              size={48}
              accessible={true}
              accessibilityLabel="Verwijder video knop"
            />
          </>
        ) : (
          <Text />
        )}
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => requestCameraPermission()}>
            <Icon name="video-camera" style={styles.imagePadding} size={48} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => pickVideoFromGallery()}>
            <Icon name="film" size={48} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imagePadding: {
    paddingEnd: 15,
  },
  icon: {
    position: 'absolute',
    end: 0,
    top: 0,
    color: COLORS.black,
  },
  imgStyle: {
    width: 150,
    height: 150,
    resizeMode: 'center',
    alignSelf: 'center',
  },
});

export default VideoSelector;
