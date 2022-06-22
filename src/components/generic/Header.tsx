import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FONTS from '../../assets/fonts';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import Radar from '../../data/location/Radar';

interface headerProps {
  title: string;
  hasHomeButton?: boolean;
  hasBackButton?: boolean;
  hasHelpButton?: boolean;
}

const Header = ({ title, hasHomeButton, hasBackButton, hasHelpButton }: headerProps) => {
  const navigation = useNavigation();
  const route = useRoute();

  const getBackRouteName = () => {
    const basicBackRouteName = 'Vorige pagina';

    const routes = navigation.getState().routes;
    if (!routes) return basicBackRouteName;

    const backRoute = routes[routes.length - 2];
    if (!backRoute) return basicBackRouteName;

    const backRouteParams = backRoute.params as { backRouteName: string };
    if (!backRouteParams.backRouteName) return basicBackRouteName;

    return backRouteParams.backRouteName;
  };

  const getHeaderTitle = () => {
    const params = route.params as { title: string };
    if (!params.title) return title;
    return params.title;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <View style={styles.headerTop}>
          {hasHomeButton ? (
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={ACCESSIBILITY_STRINGS.homeButton}
              accessibilityHint={ACCESSIBILITY_STRINGS.homeButtonHint}
              onPress={() => handleHomeButton(navigation)}
            >
              <Icon name="home" size={40} color={COLORS.white} />
            </TouchableOpacity>
          ) : (
            hasBackButton && (
              <TouchableOpacity
                accessibilityLabel={ACCESSIBILITY_STRINGS.backButton}
                accessibilityHint={
                  ACCESSIBILITY_STRINGS.backButtonHint +
                  (getBackRouteName() !== '' ? getBackRouteName() : 'vorige pagina')
                }
                onPress={() => handleBackButton(navigation)}
              >
                <Icon
                  name="arrow-circle-down"
                  size={40}
                  color={COLORS.white}
                  style={{ transform: [{ rotate: '90deg' }] }}
                />
              </TouchableOpacity>
            )
          )}
          {hasHelpButton && (
            <TouchableOpacity
              style={styles.helpButton}
              accessibilityLabel={ACCESSIBILITY_STRINGS.helpButton}
              accessibilityHint={ACCESSIBILITY_STRINGS.helpButtonHint}
              onPress={() => handleHelpButton(navigation)}
            >
              <Icon name="help-outline" size={40} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.headerTitle} ellipsizeMode={'tail'} numberOfLines={1}>
            {getHeaderTitle()}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );

  async function handleBackButton(navigationProp: NavigationProp<any, any>) {
    if (title === ACCESSIBILITY_STRINGS.sectionTitle) {
      await Radar.start().then(() => console.log('Radar started'));
    }
    navigationProp.goBack();
  }

  function handleHomeButton(navigationProp: NavigationProp<any, any>) {
    navigationProp.navigate('Home');
  }

  function handleHelpButton(navigationProp: NavigationProp<any, any>) {
    navigationProp.navigate('Help');
  }
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.darkBlue,
  },
  headerBar: {
    width: '100%',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBottom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: 25,
  },
  helpButton: {
    marginLeft: 'auto',
  },
  helpIcon: {
    color: COLORS.white,
    fontFamily: FONTS.extraBold,
    fontSize: 25,
  },
});

export default Header;
