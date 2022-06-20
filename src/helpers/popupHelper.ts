import Snackbar from 'react-native-snackbar';

export function triggerSnackbarShort(msg: string, color: string) {
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: color,
  });
}

export function triggerSnackbarLong(msg: string, color: string) {
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: color,
  });
}

export function triggerSnackbarIndefinite(msg: string, color: string) {
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_INDEFINITE,
    backgroundColor: color,
  });
}
