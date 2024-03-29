import React from 'react';
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MasterContainer from '../components/generic/MasterContainer';
import FONTS from '../assets/fonts';
import COLORS from '../assets/colors';
import ACC_STRS from '../assets/accessibilityStrings';

const createText = () => {
  return data.map((element, index) => {
    return (
      <Text key={index} accessible={true} accessibilityLabel={element.label} style={element.style}>
        {element.text}
      </Text>
    );
  });
};

// TODO fill phoneNumber based on data of specific cliënt
const phoneCall = () => {
  let phoneNumber = '+31 30 239 82 70';

  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
};

const HelpScreen = () => {
  return (
    <MasterContainer>
      <Image
        style={styles.logo}
        source={require('../assets/images/logos/icon_accessibility_logo_RGB.jpg')}
      />
      <View style={styles.contactInfo}>
        <View>
          <Text style={styles.h1}>{ACC_STRS.helpStandardTitle}</Text>
          {/*Creating text elements based on data*/}
          <View>{createText()}</View>
        </View>
        <TouchableOpacity
          style={styles.emailBtn}
          accessible={true}
          accessibilityLabel={ACC_STRS.contactSendEmailHint}
          onPress={() => {
            Linking.openURL('mailto: info@accessibility.nl');
          }}
        >
          <Text style={styles.emailBtnText}>{ACC_STRS.contactSendEmail}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailBtn} onPress={phoneCall}>
          <Text
            accessible={true}
            accessibilityLabel={ACC_STRS.contactCallPhoneLabel}
            style={styles.emailBtnText}
          >
            {ACC_STRS.contactCallPhone}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfo}>
        <Text
          accessible={true}
          accessibilityLabel={ACC_STRS.contactExtraInfoLabel}
          style={styles.contactText}
        >
          {ACC_STRS.contactExtraInfo}
        </Text>
      </View>
    </MasterContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  h1: {
    fontFamily: FONTS.semiBold,
    fontSize: 25,
    color: COLORS.black,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 15,
    textAlign: 'left',
  },
  contactExtraInfo: {
    position: 'relative',
    left: 30,
    backgroundColor: COLORS.gray,
    paddingLeft: 10,
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  contactInfo: {
    position: 'relative',
    left: -30,
    backgroundColor: COLORS.gray,
    paddingLeft: 10,
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
  },
  contactTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 20,
    color: COLORS.black,
    paddingLeft: 20,
    paddingTop: 5,
    textAlign: 'left',
  },
  contactText: {
    paddingLeft: 20,
    paddingBottom: 5,
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },
  emailBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
  },
  emailBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: 18,
  },
});

const data = [
  {
    text: ACC_STRS.helpDataAddress,
    style: styles.contactText,
    label: ACC_STRS.contactAddress,
  },
  {
    text: ACC_STRS.helpDataPostalCode,
    style: styles.contactText,
    label: ACC_STRS.contactPostalCode,
  },
];

export default HelpScreen;
