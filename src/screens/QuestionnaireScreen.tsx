import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../assets/colors';
import FONTS from '../assets/fonts';
import Divider from '../components/generic/Divider';
import MasterContainer from '../components/generic/MasterContainer';
import { Questionnaire } from '../models/Questionnaire';
import { Section } from '../models/Section';
import SectionList from '../components/section/SectionList';
import Radar, { Event, Result } from '../data/location/Radar';
import accessibilityStrings from '../assets/accessibilityStrings';

const QuestionnaireScreen = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
  const [sectionsIcon, setSectionsIcon] = useState<string>('angle-down');
  const [nearbySections, setNearbySections] = useState<Section[]>([]);
  const [sectionsVisible, setSectionsVisible] = useState<boolean>(true);
  const [lastCountOfNearbySections, setLastCountOfNearbySections] = useState<number>(0);

  const route = useRoute();

  useEffect(() => {
    Radar.on(configureNearBySections);
    Radar.start().then(() => 'Radar started');

    const currentParams = route.params as { questionnaire: Questionnaire };
    if (!currentParams) return;
    setQuestionnaire(currentParams.questionnaire);

    function configureNearBySections(result: Result) {
      const nearbyGeofences = result.events.filter((event: Event) => {
        return event.type === 'entered';
      });
      const nearbyGeofenceIds = nearbyGeofences.map((event: Event) => {
        return event.geofence.sectionId;
      });
      let sections: Section[] = [];
      if (questionnaire && questionnaire.sections) {
        sections = questionnaire.sections;
      }
      setNearbySections(getSectionsThatAreNearby(sections, nearbyGeofenceIds));
      checkIfShowToast();
    }

    function checkIfShowToast() {
      if (lastCountOfNearbySections < nearbySections.length) {
        showToast('Er is een nieuwe onderdeel bij u in de buurt');
      }
      setLastCountOfNearbySections(nearbySections.length);
    }

    function showToast(msg: string) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.LONG);
      } else {
        Alert.alert(msg);
      }
    }
  }, [route.params, questionnaire, lastCountOfNearbySections, nearbySections.length]);

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
            {nearbySections.length === 0 && (
              <Text style={styles.text}>{accessibilityStrings.noSectionsNearby}</Text>
            )}
            <SectionList sections={nearbySections} />
          </View>
          <Divider width="100%" height={3} margin={20} />
          <View>
            <TouchableOpacity
              accessibilityLabel={'Alle onderdelen'}
              accessibilityHint={'Inklapbaar, ' + (sectionsVisible ? 'open' : 'dicht')}
              onPress={() => {
                setSectionsVisible(!sectionsVisible);
                setSectionsIcon(sectionsVisible ? 'angle-up' : 'angle-down');
              }}
            >
              <Text style={styles.sectionTitle}>
                Alle onderdelen <Icon name={sectionsIcon} size={30} />
              </Text>
            </TouchableOpacity>
            <Divider width="33%" height={2} margin={0} />
            {questionnaire.sections?.length === 0 && (
              <Text style={styles.text}>{accessibilityStrings.noSectionsNearby}</Text>
            )}
            {sectionsVisible && <SectionList sections={questionnaire.sections} />}
          </View>
          <Divider width="100%" height={3} margin={20} />
        </>
      )}
    </MasterContainer>
  );
};

function getSectionsThatAreNearby(sections: Section[], closeGeofenceIds: number[] = []): Section[] {
  let closeSections: Section[] = [];
  sections?.forEach((section) => {
    if (closeGeofenceIds.includes(section.id ?? -1)) {
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
  text: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: COLORS.black,
  },
});

export default QuestionnaireScreen;
