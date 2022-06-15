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
    return AsyncStorage.getItem('ParticipantCode');
  }

  public static async setCurrentQuestionaireHelp(help: string) {
    await AsyncStorage.setItem('CurrentQuestionaireHelp', JSON.stringify(help));
  }

  public static async getCurrentQuestionaireHelp(): Promise<string | null> {
    return AsyncStorage.getItem('CurrentQuestionaireHelp');
  }

  static async setCurrentQuestionaireTitle(title: string) {
    await AsyncStorage.setItem('CurrentQuestionaireTitle', JSON.stringify(title));
  }

  static async getCurrentQuestionaireTitle(): Promise<string | null> {
    return AsyncStorage.getItem('CurrentQuestionaireTitle');
  }

  public static async getCurrentQuestionaireExtraData() {
    let q = await AsyncStorage.getItem('CurrentQuestionaire');
    return typeof q === 'string' ? JSON.parse(q) : null;
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
