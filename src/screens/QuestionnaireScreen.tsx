import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import { Questionnaire } from '../models/Questionnaire';
import { Section } from '../models/Section';
import SectionList from '../components/section/SectionList';
import Radar from '../data/location/Radar';
import ParticipantCode from '../data/localStorage/ParticipantCode';

const QuestionnaireScreen = () => {
  Radar.on((result: any) => {
    console.log('events:' + JSON.stringify(result));
  });
  Radar.start('cd66931c-a623-11ec-b909-0242ac120002');

  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
  const [sectionsIcon, setSectionsIcon] = useState<string>('angle-down');
  const [sectionsVisible, setSectionsVisible] = useState<boolean>(true);

  const route = useRoute();

  useEffect(() => {
    const currentParams = route.params as { questionnaire: Questionnaire };
    if (!currentParams) return;
    setQuestionnaire(currentParams.questionnaire);
    new ParticipantCode().SaveParticipantCodeToLocalStorage(
      currentParams.questionnaire.participantCode
    );
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
            <SectionList sections={getSectionsThatAreNearby(questionnaire.sections, [1], [])} />
          </View>
          <Divider width="100%" height={3} margin={20} />
          <View>
            <Text
              style={styles.sectionTitle}
              onPress={() => {
                setSectionsVisible(!sectionsVisible);
                setSectionsIcon(sectionsVisible ? 'angle-up' : 'angle-down');
              }}
            >
              Alle onderdelen <Icon name={sectionsIcon} size={30} />
            </Text>
            <Divider width="33%" height={2} margin={0} />
            {sectionsVisible && <SectionList sections={questionnaire.sections} />}
          </View>
          <Divider width="100%" height={3} margin={20} />
        </>
      )}
    </MasterContainer>
  );
};

function getSectionsThatAreNearby(
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
