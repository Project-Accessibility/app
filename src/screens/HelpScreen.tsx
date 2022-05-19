import React from 'react';
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MasterContainer from '../components/generic/MasterContainer';
import FONTS from '../assets/fonts';
import COLORS from '../assets/colors';
import ACC_STRS from '../assets/accessibilityStrings';

const createText = () => {
  return data.map((element, index) => {
    return (
      <Text key={index} accessible={true} style={element.style}>
        {element.text}
      </Text>
    );
  });
};

// TODO fill phoneNumber based on data of specific cliënt
const phoneCall = () => {
  let phoneNumber = ACC_STRS.contactPhone;

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
          <Text style={styles.h1}>{ACC_STRS.contactTitle}</Text>
          {/*Creating text elements based on data*/}
          <View accessible={true}>{createText()}</View>
        </View>
        <TouchableOpacity
          style={styles.emailBtn}
          onPress={() => {
            Linking.openURL(`mailto: ${ACC_STRS.contactEmail}`);
          }}
        >
          <Text
            accessible={true}
            accessibilityHint={ACC_STRS.contactSendEmailHint}
            style={styles.emailBtnText}
          >
            {ACC_STRS.contactSendEmail}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailBtn} onPress={phoneCall}>
          <Text
            accessible={true}
            accessibilityHint={ACC_STRS.contactCallPhoneHint}
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
  // {
  //   text: ACC_STRS.contactSubtitle,
  //   style: styles.contactTitle,
  // },
  {
    text: ACC_STRS.contactStreet,
    style: styles.contactText,
  },
  {
    text: `${ACC_STRS.contactPostalCode} ${ACC_STRS.contactCity}`,
    style: styles.contactText,
  },
  // {
  //   text: ACC_STRS.phone,
  //   style: styles.contactTitle,
  // },
  // {
  //   text: ACC_STRS.contactPhone,
  //   style: styles.contactText,
  // },
  // {
  //   text: ACC_STRS.email,
  //   style: styles.contactTitle,
  // },
  // {
  //   text: ACC_STRS.contactEmail,
  //   style: styles.contactText,
  // },
];

export default HelpScreen;
