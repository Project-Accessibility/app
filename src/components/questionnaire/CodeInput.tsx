import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';
import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';

const CodeInput = () => {
  const [code, setCode] = useState<String>('');

  const handleCodeEntered = () => {
    getAllQuestionnaireDataByCode(code);
    //* TODO: make code entered function
    return code;
  };

  return (
    <View style={styles.codeForm}>
      <TextInput
        style={styles.codeInput}
        placeholder={ACCESSIBILITY_STRINGS.codeInputField}
        placeholderTextColor={COLORS.black}
        maxLength={5}
        autoCapitalize="characters"
        onChangeText={(value: String) => setCode(value.toUpperCase())}
      />
      <TouchableOpacity
        style={styles.codeButton}
        onPress={handleCodeEntered}
        accessible={true}
        accessibilityLabel={ACCESSIBILITY_STRINGS.codeInputButton}
        accessibilityHint={ACCESSIBILITY_STRINGS.codeInputButtonHint}
        accessibilityActions={[
          { name: 'activate', label: ACCESSIBILITY_STRINGS.codeInputButtonAction },
        ]}
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
