import permissions from 'react-native-permissions';
const mockedPermissions = permissions as jest.Mocked<typeof permissions>;
jest.mock('react-native-permissions', () => {
  return mockedPermissions;
});
import radar from 'react-native-radar';
const mockedRadar = radar as jest.Mocked<typeof radar>;
jest.mock('react-native-radar', () => {
  return mockedRadar;
});
