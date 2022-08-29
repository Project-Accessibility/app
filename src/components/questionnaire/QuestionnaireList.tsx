import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionnaireDisplay } from '../../data/localStorage/ParticipantCode';
import Button from '../generic/Button';
import { fetchQuestionnaire } from '../utility/FetchQuestionnaire';
import { triggerSnackbarShort } from '../../helpers/popupHelper';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import Colors from '../../assets/colors';

interface QuestionnaireListProps {
  questionnaires: QuestionnaireDisplay[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionnaireList = ({ questionnaires, setRefresh }: QuestionnaireListProps) => {
  const navigation = useNavigation();

  const handleQuestionnaireSelected = async (code: string) => {
    triggerSnackbarShort(ACCESSIBILITY_STRINGS.codeCorrect, Colors.darkBlue);
    fetchQuestionnaire(code, navigation).then((deleted) => {
      setRefresh(true);
      if (deleted) {
        triggerSnackbarShort(ACCESSIBILITY_STRINGS.questionListDeleted, Colors.darkBlue);
      }
    });
  };

  return (
    <>
      {questionnaires?.map((questionnaireItem, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              accLabel={questionnaireItem.name}
              accHint={`${index + 1} van de ${questionnaires.length}`}
              title={questionnaireItem.name}
              onButtonPress={() => handleQuestionnaireSelected(questionnaireItem.code)}
            />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginBottom: 10,
  },
});

export default QuestionnaireList;
