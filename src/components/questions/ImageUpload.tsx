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
  Platform,
} from 'react-native';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';

const ImageUpload = () => {
  const [image, SetImage] = React.useState('');

  // Show toast alert messages
  const setToastMsg = (msg: any) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const PickImageFromGallery = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true }, (response) => {
      if (response.didCancel) {
        setToastMsg('Geen foto gekozen');
      } else if (response.errorCode == 'permission') {
        setToastMsg('Permissie afgewezen');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else {
        SetImage(response.assets[0].base64);
      }
    });
  };

  const UseCamera = () => {
    ImagePicker.launchCamera({ mediaType: 'photo', quality: 1, includeBase64: true }, (response) => {
      if (response.didCancel) {
        setToastMsg('Geen foto gemaakt');
      } else if (response.errorCode == 'permission') {
        setToastMsg('Permissie afgewezen');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else {
        SetImage(response.assets[0].base64);
      }
    });
  };

  const RequestCameraPermission = async () => {
    //check ios camera 
    let result = await check(PERMISSIONS.IOS.CAMERA);
    {
    if(result === RESULTS.GRANTED) {
        UseCamera();
      } else if(result === RESULTS.DENIED) {
        result = await request(PERMISSIONS.IOS.CAMERA);
      }
    }
    //check android camera
    check(PERMISSIONS.ANDROID.CAMERA);
    {
      const granted = await request(PERMISSIONS.ANDROID.CAMERA);
      if (granted) {
        UseCamera();
      } else if(result === RESULTS.DENIED) {
        result = await request(PERMISSIONS.ANDROID.CAMERA);
      }
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
          <TouchableOpacity activeOpacity={0.5} onPress={() => RequestCameraPermission()}>
            <Icon name="camera" style={styles.imagePadding} size={48} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => PickImageFromGallery()}>
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
  imagePadding: { 
    paddingEnd: 15 
  },
});

export default ImageUpload;