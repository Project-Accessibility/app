import React from 'react';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Queue from '../../data/localStorage/Queue';
import { Question } from '../../models/Question';
import { QueueAction } from '../../enums/QueueAction';
import ACCESSIBILITY_STRINGS from '../../assets/accessibilityStrings';
import { showToast } from '../../helpers/popupHelper';

interface SaveButtonProps {
  question: Question | undefined;
}

const SaveButton = ({ question }: SaveButtonProps) => {
  const queue = Queue.getInstance();
  const onSave = (questionObject: Question | undefined) => {
    if (!questionObject) return;
    SaveData(questionObject);

    showToast(ACCESSIBILITY_STRINGS.saveButton);
  };

  const SaveData = async (questionObject: Question) => {
    await queue.addObjectToQueue(QueueAction.SaveQuestion, questionObject);
    queue.executeQueue();
  };

  return (
    <TouchableOpacity
      style={styles.buttonView}
      accessibilityLabel={'Vraag opslaan'}
      accessibilityHint={'Opslaan is niet definitief'}
      accessible={true}
      onPress={() => onSave(question)}
    >
      <Text style={styles.buttonText}>Opslaan</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.extraBold,
    fontSize: 18,
  },
});

export default SaveButton;
