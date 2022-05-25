import AsyncStorage from '@react-native-async-storage/async-storage';

export interface questionnaire {
  code: string;
  name: string;
}

class ParticipantCode {
  public static async saveCurrentParticipantCodeToLocalStorage(code: string) {
    await AsyncStorage.setItem('ParticipantCode', code);
  }

  public static async loadCurrentParticipantCodeFromLocalStorage() {
    return await AsyncStorage.getItem('ParticipantCode');
  }

  public static async addQuestionnaireInLocalStorage(questionnaire: questionnaire) {
    let questionnaires = await this.getQuestionnairesFromLocalStorage();
    if (questionnaires == null) {
      questionnaires = [];
    }
    questionnaires.push(questionnaire);
    await AsyncStorage.setItem('codes', JSON.stringify(questionnaires));
  }

  public static async getQuestionnairesFromLocalStorage(): Promise<questionnaire[] | null> {
    return JSON.parse(<string>await AsyncStorage.getItem('questionnaires'));
  }
}

export default ParticipantCode;
