import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';

const ImageUpload = () => {
  const [image, SetImage] = React.useState<string | undefined>('');

  const PickImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true }, (response) => {
      if (response.didCancel) {
        console.log('Geen foto gekozen');
      } else if (response.errorCode == 'permission') {
        console.log('Permissie afgewezen');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else {
        if (response.assets) {
          const source = response.assets[0].base64;
          SetImage(source);
        }
      }
    });
  };

  const UseCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 1, includeBase64: true }, (response) => {
      if (response.didCancel) {
        console.log('Geen foto gemaakt');
      } else if (response.errorCode == 'permission') {
        console.log('Permissie afgewezen');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else {
        if (response.assets) {
          const source = response.assets[0].base64;
          SetImage(source);
        }
      }
    });
  };

  const RequestCameraPermission = async () => {
    //check ios camera
    check(PERMISSIONS.IOS.CAMERA)
      .then(async (result) => {
        await request(PERMISSIONS.IOS.CAMERA);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            await request(PERMISSIONS.IOS.CAMERA);
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            UseCamera();
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //check android camera
    check(PERMISSIONS.ANDROID.CAMERA)
      .then(async (result) => {
        await request(PERMISSIONS.ANDROID.CAMERA);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            await request(PERMISSIONS.ANDROID.CAMERA);
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            UseCamera();
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <>
            <Image
              style={styles.imageStyle}
              source={{
                uri: 'data:image/jpeg;base64,' + image,
              }}
            />
            <Icon
              onPress={() => SetImage('')}
              name="remove"
              style={{
                position: 'absolute',
                end: 0,
                top: 0,
              }}
              size={48}
            />
          </>
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
    paddingEnd: 15,
  },
});

export default ImageUpload;
