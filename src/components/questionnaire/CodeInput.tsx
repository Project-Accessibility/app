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
import { getAllQuestionnaireDataByCode } from '../../data/api/Questionnaire';
import ParticipantCode from '../../data/localStorage/ParticipantCode';
import { Questionnaire } from '../../models/Questionnaire';

const CodeInput = () => {
  const [code, setCode] = useState<string>('');
  const navigation = useNavigation();

  const handleCodeEntered = async () => {
    try {
      let questionnaireResponse = await getAllQuestionnaireDataByCode(code);
      if (questionnaireResponse.status === 200) {
        const questionnaire: Questionnaire = questionnaireResponse.data;
        await ParticipantCode.saveCurrentParticipantCodeToLocalStorage(code);
        await ParticipantCode.addQuestionnaireInLocalStorage({
          code: code,
          name: questionnaire.title,
        });
        // @ts-ignore next-line
        navigation.navigate('Questionnaire', {
          title: questionnaire.title,
          questionnaire: questionnaire,
        });
      }
    } catch (e) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire, ToastAndroid.LONG);
      } else {
        Alert.alert(ACCESSIBILITY_STRINGS.failedToFetchQuestionnaire);
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
