import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';

const ImageUpload = () => {
  const [image, SetImage] = React.useState('');

  // Show toast alert messages
  const setToastMsg = (msg: any) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const uploadImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true }, (response) => {
      if (response.didCancel) {
        setToastMsg('geen foto gekozen');
      } else if (response.errorCode == 'permission') {
        setToastMsg('permissie afgewezen');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert('Maximum grootte verstreken', 'Selecteer een foto onder 2M B', [
          { text: 'OK' },
        ]);
      } else {
        SetImage(response.assets[0].base64);
      }
    });
  };

  const UseCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 1, includeBase64: true }, (response) => {
      if (response.didCancel) {
        setToastMsg('foto niet gemaakt');
      } else if (response.errorCode == 'permission') {
        setToastMsg('permissie afgewezen');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else {
        SetImage(response.assets[0].base64);
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        UseCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <Image
            style={styles.imageStyle}
            source={{
              uri: 'data:image/jpeg;base64,' + image,
            }}
          />
        ) : (
          <Text>''</Text>
        )}
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => requestCameraPermission()}>
            <Icon name="camera" style={styles.imagePadding} size={48} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => uploadImage()}>
            <Icon name="image" size={48} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imagePadding: { paddingEnd: 15 },
});

export default ImageUpload;
