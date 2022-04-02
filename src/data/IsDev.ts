import Config from 'react-native-config';
const IsDev = Config.NODE_ENV && Config.NODE_ENV === 'development';

export default IsDev;
