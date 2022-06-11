import permissions from 'react-native-permissions';
const mockedPermissions = permissions as jest.Mocked<typeof permissions>;
jest.mock('react-native-permissions', () => {
  return mockedPermissions;
});
jest.mock('react-native-config', () => {
  return {
    DEBUG: true,
  };
});
import radar from 'react-native-radar';
const mockedRadar = radar as jest.Mocked<typeof radar>;
jest.mock('react-native-radar', () => {
  return mockedRadar;
});
import slider from 'rn-range-slider';
const mockedSlider = slider as jest.Mocked<typeof slider>;
jest.mock('rn-range-slider', () => {
  return mockedSlider;
});
import storage from '@react-native-async-storage/async-storage';
const mockedStorage = storage as jest.Mocked<typeof storage>;
jest.mock('@react-native-async-storage/async-storage', () => {
  return mockedStorage;
});
import netinfo from '@react-native-community/netinfo';
const mockedNetinfo = netinfo as jest.Mocked<typeof netinfo>;
jest.mock('@react-native-community/netinfo', () => {
  return mockedNetinfo;
});
import Video from 'react-native-video';
const mockedVideo = Video as jest.Mocked<typeof Video>;
jest.mock('react-native-video', () => {
  return mockedVideo;
});
import Snackbar from 'react-native-snackbar';
const mockedSnackbar = Snackbar as jest.Mocked<typeof Snackbar>;
jest.mock('react-native-snackbar', () => {
  return mockedSnackbar;
});
import NetInfo from '@react-native-community/netinfo';
const mockedNetInfo = NetInfo as jest.Mocked<typeof NetInfo>;
jest.mock('@react-native-community/netinfo', () => {
  return mockedNetInfo;
});

jest.mock('react-native-bootsplash', () => {
  return {
    show: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});
