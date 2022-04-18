import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MasterContainer from '../components/generic/MasterContainer';
import FONTS from '../assets/fonts';
import COLORS from '../assets/colors';
import AS from '../assets/accessibilityStrings';

const createText = () => {
  return data.map((element, index) => {
    console.log(data);
    return (
      <Text key={index} accessible={true} style={element.style}>
        {element.text}
      </Text>
    );
  });
};

const HelpScreen = () => {
  return (
    <MasterContainer>
      <Image
        style={styles.logo}
        source={require('../assets/images/logos/icon_accessibility_logo_RGB.jpg')}
      />
      <View style={styles.contactInfo}>
        <Text accessible={true} style={styles.h1}>
          {AS.contactTitle}
        </Text>
        {/*Creating text elements based on data*/}
        {createText()}
        <TouchableOpacity
          style={styles.emailBtn}
          onPress={() => {
            Linking.openURL('mailto: ' + AS.contactEmail);
          }}
        >
          <Text
            accessible={true}
            accessibilityHint={AS.contactSendEmailHint}
            style={styles.emailBtnText}
          >
            {AS.contactSendEmail}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfo}>
        <Text
          accessible={true}
          accessibilityLabel={AS.contactExtraInfoLabel}
          style={styles.contactText}
        >
          {AS.contactExtraInfo}
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
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },
  emailBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: COLORS.lightBlue,
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
    text: AS.contactSubtitle,
    style: styles.contactTitle,
  },
  {
    text: AS.contactStreet,
    style: styles.contactText,
  },
  {
    text: `${AS.contactPostalCode} ${AS.contactCity}`,
    style: styles.contactText,
  },
  {
    text: AS.phone,
    style: styles.contactTitle,
  },
  {
    text: AS.contactPhone,
    style: styles.contactText,
  },
  {
    text: AS.email,
    style: styles.contactTitle,
  },
  {
    text: AS.contactEmail,
    style: styles.contactText,
  },
];

export default HelpScreen;
