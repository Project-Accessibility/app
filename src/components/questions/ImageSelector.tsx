import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
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
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { triggerSnackbarShort } from '../../helpers/popupHelper';

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
        triggerSnackbarShort(ACCESSIBILITY_STRINGS.fileUploadSuccess, COLORS.darkBlue);
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
              <View accessible={false} importantForAccessibility={'no'}>
                <ImageModal
                  accessibilityLabel={'Gemaakte afbeelding'}
                  resizeMode="contain"
                  style={styles.imgStyle}
                  source={{
                    uri: fixMediaUri(image),
                  }}
                >
                  <View style={styles.imageButtons}>
                    <View
                        pointerEvents="none"
                        accessible={true}
                        accessibilityLabel="Afbeelding vergroten knop"
                    >
                      <Icon name="expand" color={COLORS.black} size={48} />
                    </View>
                    <TouchableOpacity
                        onPress={() => RemoveImage()}
                        accessible={true}
                        accessibilityLabel="Verwijder afbeelding knop"
                    >
                      <Icon name="trash" color={COLORS.black} size={48} />
                    </TouchableOpacity>
                  </View>
                </ImageModal>
              </View>
          </>
        ) : null}
        <View style={styles.rowContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => RequestCameraPermission()}
            accessibilityLabel={'Open camera om een afbeelding te maken. Knop.'}
          >
            <Icon name="camera" style={styles.rowContainerChild} size={48} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => PickImageFromGallery()}
            accessibilityLabel={'Open galerij om een afbeelding te selecteren. Knop.'}
          >
            <Icon name="image" style={styles.rowContainerChild} size={48} color={COLORS.black} />
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
  imgStyle: {
    width: '100%',
    aspectRatio: 2,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 10,
  },
  imageButtons: {
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

export default ImageSelector;
