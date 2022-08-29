import React from 'react';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../assets/colors';
import FONTS from '../../assets/fonts';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Queue from '../../data/localStorage/Queue';
import { Question } from '../../models/Question';
import { QueueAction } from '../../enums/QueueAction';
import { Section } from '../../models/Section';

interface SaveButtonProps {
  section: Section | undefined;
  question: Question | undefined;
}

const SaveButton = ({ question, section }: SaveButtonProps) => {
  const queue = Queue.getInstance();

  const navigation = useNavigation();

  const onSave = (questionObject: Question | undefined) => {
    if (!questionObject) return;
    SaveData(questionObject);

    if (section) {
      // @ts-ignore
      navigation.navigate('Section', {
        title: section.title,
        section: section,
        saved: true,
      });
    }
  };

  const SaveData = async (questionObject: Question) => {
    await queue.addObjectToQueue(QueueAction.SaveQuestion, questionObject);
    queue.executeQueue();
  };

  const typeOfSaving = question
    ? Question.isAnswered(question)
      ? 'aanpassen'
      : 'opslaan'
    : 'opslaan';

  return (
    <TouchableOpacity
      style={styles.buttonView}
      accessibilityLabel={`Vraag ${typeOfSaving}, Knop.`}
      accessibilityHint={`${typeOfSaving} is niet definitief. Je wordt teruggestuurd naar het vragen overzicht`}
      accessible={true}
      onPress={() => onSave(question)}
    >
      <Text style={styles.buttonText}>
        {typeOfSaving.charAt(0).toUpperCase() + typeOfSaving.slice(1)}
      </Text>
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
