import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';
import permissionCheck from '../utility/PermissionCheck';
import ImageModal from 'react-native-image-modal';
import { ImageSelectedData } from '../../models/questionOptionExtraData/ImageSelectedData';
import getLastItemFromSplit from '../../helpers/splitHelper';

const ImageSelector = (props: {
  onImageSelected: (selectedImageData: ImageSelectedData) => void;
  defaultValue: string | undefined;
}) => {
  const [image, SetImage] = React.useState<string | undefined>(props.defaultValue);
  //Check if image already exists (this is when image is already uplaoded to DB), if so, set correct metadata
  try {
    if (image) {
      props.onImageSelected({
        uri: image,
        type: `image/${getLastItemFromSplit(image, '.')}`,
        name: getLastItemFromSplit(image, '/'),
      });
    }
  } catch (_) {}

  useEffect(() => {
    if (props.value) SetImage(props.value);
  }, [props.value]);

  const checkResponse = (response: ImagePickerResponse) => {
    //Check for future logging system for response errors
    if (response.didCancel) {
      console.log('Geen foto geselecteerd');
    } else if (response.errorCode === 'permission') {
      console.log('Permissie afgewezen');
    } else if (response.errorCode === 'others') {
      console.log(response.errorMessage);
    } else {
      if (response.assets && response.assets[0]) {
        const source = response.assets[0];
        const formDataImage = {
          uri: source.uri,
          type: source.type,
          name: source.fileName,
        } as ImageSelectedData;
        props.onImageSelected(formDataImage);
        SetImage(source.uri);
      }
    }
  };
  const UseCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 1, includeBase64: false }, (response) => {
      checkResponse(response);
    });
  };
  const PickImageFromGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: false }, (response) => {
      checkResponse(response);
    });
  };

  const RemoveImage = () => {
    SetImage('');
    props.onImageSelected('');
  };

  const RequestCameraPermission = async () => {
    //check ios camera
    permissionCheck.checkPermission(PERMISSIONS.IOS.CAMERA);

    //check android camera
    permissionCheck.checkPermission(PERMISSIONS.ANDROID.CAMERA);
    UseCamera();
  };

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <>
            <View style={styles.imgStyle}>
              <ImageModal
                modalImageResizeMode="contain"
                style={styles.imgStyle}
                source={{
                  uri: image,
                }}
              />
            </View>
            <Icon
              onPress={() => RemoveImage()}
              name="remove"
              style={styles.icon}
              size={48}
              accessible={true}
              accessibilityLabel="Verwijder afbeelding knop"
            />
          </>
        ) : (
          <Text />
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

export default ImageSelector;
