import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Section } from '../../models/Section';
import Button from '../generic/Button';
import Radar from '../../data/location/Radar';

const SectionList = (props: { sections: Section[] }) => {
  const sections: Section[] = props.sections;
  const navigation = useNavigation();

  return (
    <>
      {sections?.map((section, index) => {
        return (
          <View key={index} style={styles.buttonView}>
            <Button
              accLabel={`Onderdeel ${section.title}`}
              title={section.title}
              onButtonPress={() => {
                Radar.stopTracking();
                // @ts-ignore next-line
                navigation.navigate('Section', {
                  title: section.title,
                  section: section,
                });
              }}
              maxAnswers={getTotalQuestions(section)}
              answered={getAnsweredQuestions(section)}
            />
          </View>
        );
      })}
    </>
  );
};

function getAnsweredQuestions(section: Section): number {
  let answeredQuestions = 0;
  section.questions?.forEach((question) => {
    let isAnswered = false;
    question.options?.forEach((option) => {
      if (option.answer) {
        isAnswered = true;
      }
    });
    if (isAnswered) answeredQuestions++;
  });
  return answeredQuestions;
}

function getTotalQuestions(section: Section): number {
  return section.questions?.length ?? 0;
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 5,
  },
});

export default SectionList;
