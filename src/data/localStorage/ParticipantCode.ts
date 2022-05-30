import AsyncStorage from '@react-native-async-storage/async-storage';

export interface QuestionnaireDisplay {
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

  private static questionnaireExists(questionnaires: QuestionnaireDisplay[], code: string) {
    let exists = false;
    questionnaires.forEach((q) => {
      if (q.code === code) {
        exists = true;
      }
    });
    return exists;
  }

  public static async addQuestionnaireInLocalStorage(questionnaire: QuestionnaireDisplay) {
    let questionnaires = await this.getQuestionnairesFromLocalStorage();
    if (questionnaires === null) {
      questionnaires = [];
    }
    if (!this.questionnaireExists(questionnaires, questionnaire.code)) {
      questionnaires.push(questionnaire);
    }
    await AsyncStorage.setItem('questionnaires', JSON.stringify(questionnaires));
  }

  public static async getQuestionnairesFromLocalStorage(): Promise<QuestionnaireDisplay[]> {
    const result = await AsyncStorage.getItem('questionnaires');
    return result ? JSON.parse(result) : [];
  }
}

export default ParticipantCode;
