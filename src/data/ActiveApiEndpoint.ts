import Routes from './routes.json';
import IsDev from './IsDev';
import getKeyValue from '../helpers/objectHelper';
import Config from 'react-native-config';

function ActiveApiEndpoint(): String {
  if (IsDev) {
    if (Config.FORCE_CERTAIN_ENDPOINT) {
      return getKeyValue(Routes.hosts, Config.ENDPOINT_TO_ENFORCE) ?? Routes.hosts.devApi;
    }
    return Routes.hosts.devApi;
  }

  return getKeyValue(Routes.hosts, Config.ENDPOINT_TO_ENFORCE) ?? Routes.hosts.devApi;
}

export default ActiveApiEndpoint;
