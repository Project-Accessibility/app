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
import { useNavigation } from '@react-navigation/native';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { triggerSnackbarShort } from '../../helpers/popupHelper';

const VideoSelector = (props: {
  value: string | undefined;
  onVideoSelected: (videoPath: FileSelectedData | undefined) => void;
}) => {
  const [video, setVideo] = React.useState<string | undefined>('');
  const [paused, setPaused] = React.useState<boolean>();
  const navigation = useNavigation();

  //Check if video already exists (this is when image is already uploaded to DB), if so, set correct metadata
  try {
    if (video) {
      props.onVideoSelected({
        uri: video,
        type: 'video/mp4',
        name: 'video-recording.mp4',
      });
    }
  } catch (_) {}

  useEffect(() => {
    if (props.value) setVideo(props.value);
  }, [props.value]);

  const checkResponse = (response: ImagePickerResponse) => {
    //Check for future logging system for response errors
    if (response.didCancel) {
      console.log('No video selected');
    } else if (response.errorCode === 'permission') {
      console.log('Permission denied');
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
        props.onVideoSelected(formDataVideo);
        setVideo(source.uri);
        triggerSnackbarShort(ACCESSIBILITY_STRINGS.fileUploadSuccess, COLORS.darkBlue);
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
    //@ts-ignore next-line
    navigation.navigate('Video', { uri: video });
  };

  return (
    <>
      <View style={styles.container}>
        {video ? (
          <>
            <Video
              resizeMode="contain"
              source={{ uri: video }}
              style={styles.video}
              controls={true}
              paused={paused}
              onLoad={() => setPaused(true)}
              accessible={true}
              accessibilityLabel="Video"
            />
            <View style={styles.videoButtons}>
              <Icon
                onPress={() => toggleFullScreen()}
                name="expand"
                color={COLORS.black}
                size={48}
                accessible={true}
                accessibilityLabel="Video vergroten knop"
              />
              <Icon
                onPress={() => removeVideo()}
                name="trash"
                color={COLORS.black}
                size={48}
                accessible={true}
                accessibilityLabel="Verwijder video knop"
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
              accessibilityLabel="Open camera om opname te maken. Knop."
              color={COLORS.black}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => pickVideoFromGallery()}>
            <Icon
              name="film"
              style={styles.rowContainerChild}
              size={48}
              accessibilityLabel="Open galerij om een video te selecteren. knop"
              color={COLORS.black}
            />
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
  video: {
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 10,
    height: 250,
    width: '100%',
  },
  videoButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',

    position: 'absolute',
    width: '100%',
    padding: 20,
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
