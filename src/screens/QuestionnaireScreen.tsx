import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import { Questionnaire } from '../models/Questionnaire';
import { Section } from '../models/Section';
import SectionList from '../components/section/SectionList';

const QuestionnaireScreen = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();

  const route = useRoute();

  useEffect(() => {
    const currentParams = route.params as { questionnaire: Questionnaire };
    if (!currentParams) return;
    setQuestionnaire(currentParams.questionnaire);
  }, [route.params]);

  return (
    <MasterContainer>
      {!questionnaire && <Text>Geen vragenlijst gevonden.</Text>}
      {questionnaire?.instructions && (
        <>
          <View>
            <Text style={styles.sectionTitle}>Instructies</Text>
            <Divider width="33%" height={2} margin={0} />
            <Text style={styles.sectionText}>{questionnaire?.instructions}</Text>
          </View>
          <Divider width="100%" height={3} margin={20} />
        </>
      )}
      {questionnaire?.description && (
        <>
          <View>
            <Text style={styles.sectionTitle}>Beschrijving</Text>
            <Divider width="33%" height={2} margin={0} />
            <Text style={styles.sectionText}>{questionnaire?.description}</Text>
          </View>
          <Divider width="100%" height={3} margin={20} />
        </>
      )}
      {questionnaire?.sections && (
        <>
          <View>
            <Text style={styles.sectionTitle}>Dichtsbijzijnde onderdelen</Text>
            <Divider width="33%" height={2} margin={0} />
            <SectionList sections={getSectionsThatAreClose(questionnaire.sections, [1], [])} />
          </View>
          <Divider width="100%" height={3} margin={20} />
          <View>
            <Text style={styles.sectionTitle}>Alle onderdelen</Text>
            <Divider width="33%" height={2} margin={0} />
            <SectionList sections={questionnaire.sections} />
          </View>
          <Divider width="100%" height={3} margin={20} />
        </>
      )}
    </MasterContainer>
  );
};

function getSectionsThatAreClose(
  sections: Section[],
  closeGeofenceIds: number[] = [],
  closeTeachableMachineIds: string[] = []
) {
  let closeSections: Section[] = [];
  sections?.forEach((section) => {
    if (
      closeGeofenceIds.includes(section.geofence?.id ?? -1) ||
      closeTeachableMachineIds.includes(section.teachableMachineClass ?? '')
    ) {
      closeSections.push(section);
    }
  });
  return closeSections;
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 25,
    color: COLORS.black,
  },
  sectionText: {
    fontFamily: FONTS.regular,
    fontSize: 20,
    color: COLORS.black,
  },
});

export default QuestionnaireScreen;
