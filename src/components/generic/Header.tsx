import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../../assets/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface headerProps {
  title: string;
  hasHomeButton?: boolean;
  hasBackButton?: boolean;
  hasHelpButton?: boolean;
}

const Header = ({ title, hasHomeButton, hasBackButton, hasHelpButton }: headerProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerBar}>
      <View style={styles.headerTop}>
        {hasHomeButton ? (
          <TouchableOpacity
            accessibilityLabel="Home knop"
            accessibilityHint="Als je naar het hoofdscherm wilt navigeren, druk dan op deze knop."
            onPress={() => handleHomeButton(navigation)}
          >
            <Icon name="home" size={40} color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          hasBackButton && (
            <TouchableOpacity
              accessibilityLabel="Terug knop"
              accessibilityHint="Als je naar het vorige scherm wilt navigeren, druk dan op deze knop."
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
            accessibilityLabel="Hulp knop"
            accessibilityHint="Als je hulp nodig hebt, druk dan op deze knop."
            onPress={() => handleHelpButton(navigation)}
          >
            <Icon name="help-outline" size={40} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerBottom}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};
const handleHomeButton = (navigation: NavigationProp<any, any>) => {
  navigation.navigate('Home');
};

const handleBackButton = (navigation: NavigationProp<any, any>) => {
  navigation.goBack();
};

const handleHelpButton = (navigation: NavigationProp<any, any>) => {
  navigation.navigate('Help');
};

const styles = StyleSheet.create({
  headerBar: {
    top: 0,
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.darkBlue,
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
    fontFamily: 'Muli-SemiBold',
    fontSize: 25,
  },
  helpButton: {
    marginLeft: 'auto',
  },
  helpIcon: {
    color: COLORS.white,
    fontFamily: 'Muli-ExtraBold',
    fontSize: 25,
  },
});

export default Header;
