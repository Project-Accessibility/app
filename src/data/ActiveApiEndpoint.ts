import Routes from './routes.json';
import IsDev from './IsDev';
import getKeyValue from '../helpers/objectHelper';

function ActiveApiEndpoint(): String {
  if (IsDev) {
    if (process.env.FORCE_CERTAIN_ENDPOINT) {
      return getKeyValue(Routes.hosts, process.env.ENDPOINT_TO_ENFORCE) ?? Routes.hosts.localApi;
    }
    return Routes.hosts.localApi;
  }

  return getKeyValue(Routes.hosts, process.env.ENDPOINT_TO_ENFORCE) ?? Routes.hosts.accApi;
}

export default ActiveApiEndpoint;
