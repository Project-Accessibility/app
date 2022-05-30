import { Platform } from 'react-native';

const fixMediaUri = (uri: string): string => {
  if (Platform.OS === 'android') {
    return uri.replace('localhost', '10.0.2.2');
  }
  return uri;
};
export default fixMediaUri;
