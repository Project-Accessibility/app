import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AccessibilityInfo,
  findNodeHandle,
} from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';
import permissionCheck from '../utility/PermissionCheck';
import ImageModal from 'react-native-image-modal';
import { FileSelectedData } from '../../models/questionOptionExtraData/FileSelectedData';
import getLastItemFromSplit from '../../helpers/splitHelper';
import fixMediaUri from '../../helpers/mediaUriHelper';
import accessibilityStrings from '../../assets/accessibilityStrings';

const ImageSelector = (props: {
  value: string | undefined;
  onImageSelected: (selectedImageData: FileSelectedData | null) => void;
}) => {
  const [image, SetImage] = React.useState<string | undefined>(props.value);
  const imageModal = useRef(null);

  //Check if image already exists (this is when image is already uploaded to DB), if so, set correct metadata
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
      console.log('No photo selected');
    } else if (response.errorCode === 'permission') {
      console.log('Permission denied');
    } else if (response.errorCode === 'others') {
      console.log(response.errorMessage);
    } else {
      if (response.assets && response.assets[0]) {
        const source = response.assets[0];
        const formDataImage = {
          uri: source.uri,
          type: source.type,
          name: source.fileName,
        } as FileSelectedData;
        props.onImageSelected(formDataImage);
        SetImage(source.uri);
        setTimeout(function () {
          if (imageModal && imageModal.current) {
            const reactTag = findNodeHandle(imageModal.current);
            if (reactTag) {
              AccessibilityInfo.setAccessibilityFocus(reactTag);
            }
          }
        }, 1000);
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
    props.onImageSelected(null);
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
            <View
              style={styles.imgStyle}
              ref={imageModal}
              accessible={true}
              accessibilityLabel={accessibilityStrings.photoDisplay}
            >
              <ImageModal
                accessible={true}
                accessibilityLabel={accessibilityStrings.photoAddedImage}
                modalImageResizeMode="contain"
                style={styles.imgStyle}
                source={{
                  uri: fixMediaUri(image),
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => RemoveImage()}
              accessible={true}
              accessibilityLabel={accessibilityStrings.photoRemoveImage}
            >
              <Icon name="remove" color={COLORS.black} size={48} />
            </TouchableOpacity>
          </>
        ) : (
          <Text />
        )}
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => RequestCameraPermission()}
            accessibilityLabel={accessibilityStrings.photoCameraIcon}
          >
            <Icon name="camera" style={styles.imagePadding} size={48} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => PickImageFromGallery()}
            accessibilityLabel={accessibilityStrings.photoGaleryIcon}
          >
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
