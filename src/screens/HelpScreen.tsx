import React, { useState } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FONTS from '../assets/fonts';
import COLORS from '../assets/colors';
import ACC_STRS from '../assets/accessibilityStrings';
import { useFocusEffect } from '@react-navigation/native';
import ParticipantCode from '../data/localStorage/ParticipantCode';
import LottieView from 'lottie-react-native';
import loadingScreen from '../assets/animations/loading.json';

let helptext: string = '';
let customTitle: string = '';

const HelpScreen = () => {
  const [hasHelpPage, setHasHelpPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      Promise.all([
        ParticipantCode.getCurrentQuestionaireTitle().then((title) => {
          if (title) {
            setHasHelpPage(true);
            customTitle = `Hulp bij ${title.slice(title.indexOf('"') + 1, title.lastIndexOf('"'))}`;
          }
        }),
        ParticipantCode.getCurrentQuestionaireHelp().then((h) => {
          if (h) {
            if (h == '' || h == '""') h = 'Geen helptekst beschikbaar.';
            helptext = h.slice(h.indexOf('"') + 1, h.lastIndexOf('"'));
          }
        }),
      ])
        .then(() => setLoading(false))
        .catch((c) => console.log(c));
    }, [])
  );

  const determineHelpScreen = () => {
    if (!loading && hasHelpPage) {
      return HelpPage();
    } else if (!loading) {
      return AccessibilityScreen(true);
    } else {
      return LoadingComponent();
    }
  };

  return <>{determineHelpScreen()}</>;
};

const createText = () => {
  return data.map((element, index) => {
    return (
      <Text key={index} accessible={true} style={element.style}>
        {element.text}
      </Text>
    );
  });
};

const phoneCall = () => {
  let phoneNumber = ACC_STRS.contactPhone;

  if (Platform.OS === 'android') {
    phoneNumber = `tel:${phoneNumber}`;
  } else {
    phoneNumber = `telprompt:${phoneNumber}`;
  }

  Linking.openURL(phoneNumber);
};

const LoadingComponent = () => {
  return (
    <View style={styles.main}>
      <LottieView source={loadingScreen} autoPlay={true} loop />
    </View>
  );
};

function HelpPage() {
  return (
    <ScrollView style={styles.main}>
      {OptionalCompanyHelp()}
      {AccessibilityScreen(false)}
    </ScrollView>
  );
}

function AccessibilityScreen(image: boolean) {
  return (
    <View style={styles.accessibilityScreen}>
      {image && (
        <Image
          accessible={true}
          accessibilityLabel={ACC_STRS.contactLogo}
          style={styles.logo}
          fadeDuration={400}
          source={require('../assets/images/logos/icon_accessibility_logo_RGB.jpg')}
        />
      )}
      <View style={styles.contactInfo}>
        <View>
          <Text style={styles.h1}>Contactgegevens Stichting Accessibility</Text>
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
            accessibilityLabel={ACC_STRS.contactSendEmailLabel}
            style={styles.emailBtnText}
          >
            Stuur een e-mail
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailBtn} onPress={phoneCall}>
          <Text
            accessible={true}
            accessibilityLabel={ACC_STRS.contactCallPhoneLabel}
            style={styles.emailBtnText}
          >
            Bellen
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfo}>
        <Text
          accessible={true}
          accessibilityLabel={ACC_STRS.contactExtraInfoLabel}
          style={styles.contactText}
        >
          Stichting Accessibility is gevestigd in het bedrijfsverzamelgebouw de Krammstate op een paar minuten lopen van Station Utrecht Overvecht.
        </Text>
      </View>
    </View>
  );
}

function OptionalCompanyHelp() {
  return (
    <>
      <View style={styles.tabScreen}>
        <Text style={styles.h1}>{customTitle}</Text>
        <Text style={styles.contactText}>{helptext}</Text>
      </View>
      <View style={styles.empty}></View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  empty: {
    padding: 20,
  },
  tabScreen: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 20,
  },
  accessibilityScreen: {
    flex: 2,
  },
  logo: {
    margin: 0,
    padding: 0,
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
    left: -20,
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
    text: ACC_STRS.contactStreet,
    style: styles.contactText,
  },
  {
    text: `${ACC_STRS.contactPostalCode} ${ACC_STRS.contactCity}`,
    style: styles.contactText,
  },
];

export default HelpScreen;
