import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';
import { handleQuestionnaire } from './HandleQuestionnaire';

const CodeInput = () => {
  const [code, setCode] = useState<string>('');

  const navigation = useNavigation();

  const handleCodeEntered = () => {
    if (code && code.length === 5) {
      handleQuestionnaire(code, navigation);
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show(ACCESSIBILITY_STRINGS.codeNotCorrect, ToastAndroid.LONG);
      } else {
        Alert.alert(ACCESSIBILITY_STRINGS.codeNotCorrect);
      }
    }
  };

  return (
    <View style={styles.codeForm}>
      <TextInput
        style={styles.codeInput}
        placeholder={ACCESSIBILITY_STRINGS.codeInputField}
        placeholderTextColor={COLORS.black}
        maxLength={5}
        autoCapitalize="characters"
        onChangeText={(value: string) => setCode(value.toUpperCase())}
      />
      <TouchableOpacity
        style={styles.codeButton}
        onPress={handleCodeEntered}
        accessible={true}
        accessibilityLabel={ACCESSIBILITY_STRINGS.codeInputButton}
        accessibilityHint={ACCESSIBILITY_STRINGS.codeInputButtonHint}
      >
        <Icon name="chevron-right" size={60} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  codeForm: {
    backgroundColor: COLORS.darkBlue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  codeInput: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 20,
    flexGrow: 1,
    marginRight: 2,
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    fontSize: 20,
  },
  codeButton: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 2,
  },
});

export default CodeInput;
