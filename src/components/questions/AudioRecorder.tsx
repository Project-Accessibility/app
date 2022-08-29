import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import React, { useEffect } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';
import { FileSelectedData } from '../../models/questionOptionExtraData/FileSelectedData';
import fixMediaUri from '../../helpers/mediaUriHelper';
import getLastItemFromSplit from '../../helpers/splitHelper';
import accessibilityStrings from '../../assets/accessibilityStrings';

const nullTime = '00:00';
const DEFAULT_RECORDED_FILE_NAME_IOS = 'sound.m4a';
const DEFAULT_RECORDED_FILE_NAME_ANDROID = 'sound.mp4';
let audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const AudioRecorder = (props: {
  value: string;
  onAudioRecorded: (audio: FileSelectedData | null) => void;
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordUri, setRecordUri] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [playTime, setPlayTime] = React.useState(nullTime);
  const [duration, setDuration] = React.useState(nullTime);
  const [voiceFriendlyDuration, setVoiceFriendlyDuration] =
    React.useState('0 minuten en 0 seconden');

  useEffect(() => {
    const uri = props.value;
    if (uri) {
      setIsDisabled(false);
      setRecordUri(uri);
    }
  }, [props.value]);

  try {
    if (recordUri) {
      props.onAudioRecorded({
        uri: recordUri,
        type: `audio/${getLastItemFromSplit(recordUri, '.')}`,
        name: getLastItemFromSplit(recordUri, '/'),
      });
    }
  } catch (_) {}

  const onStartRecord = async () => {
    Vibration.vibrate();
    onStopPlay();
    //check android
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    setRecordUri(await audioRecorderPlayer.startRecorder(undefined, audioSet));
    setIsRecording(true);
    setIsDisabled(true);

    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      setDuration(audioRecorderPlayer.mmss(Math.floor(e.currentPosition / 1000)));
      setPlayTime(nullTime);
    });
  };

  const onStopRecord = async () => {
    Vibration.vibrate();
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    let mins = duration.slice(undefined, duration.indexOf(':'));
    let secs = duration.slice(duration.indexOf(':'), duration.length);
    setVoiceFriendlyDuration(`${mins} minuten en ${secs} seconden`);

    setIsRecording(false);
    setIsDisabled(false);

    const type = Platform.OS === 'android' ? 'mp4' : 'm4a';
    const name =
      Platform.OS === 'android'
        ? DEFAULT_RECORDED_FILE_NAME_ANDROID
        : DEFAULT_RECORDED_FILE_NAME_IOS;

    const formDataAudio = {
      uri: recordUri,
      type: 'audio/' + type,
      name: name,
    } as FileSelectedData;
    props.onAudioRecorded(formDataAudio);
  };

  const onStartPlay = async () => {
    if (recordUri && isPaused) {
      await audioRecorderPlayer.resumePlayer();
    } else {
      await audioRecorderPlayer.startPlayer(fixMediaUri(recordUri));
    }

    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      setPlayTime(
        audioRecorderPlayer.mmss(
          Math.floor(e.currentPosition / 1000 > 0 ? e.currentPosition / 1000 : 0)
        )
      );
      setDuration(audioRecorderPlayer.mmss(Math.floor(e.duration / 1000)));

      if (e.currentPosition === e.duration) {
        onStopPlay();
      }
    });

    setIsPlaying(true);
    setIsPaused(false);
  };

  const onPausePlay = async () => {
    setIsPlaying(false);
    setIsPaused(true);
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    setIsPlaying(false);
    setIsPaused(false);
    setPlayTime(nullTime);

    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const onRemoveRecord = () => {
    setRecordUri('');
    setIsDisabled(true);
    setPlayTime(nullTime);
    setDuration(nullTime);

    props.onAudioRecorded(null);

    onStopPlay();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {isRecording ? (
            <Icon
              name="stop"
              size={48}
              accessible={true}
              accessibilityLabel={accessibilityStrings.audioStop}
              style={styles.icon}
              onPress={onStopRecord}
            />
          ) : (
            <Icon
              name="microphone"
              accessible={true}
              accessibilityLabel={accessibilityStrings.audioStart}
              size={48}
              style={styles.icon}
              onPress={onStartRecord}
            />
          )}
          {isPlaying ? (
            <TouchableOpacity
              disabled={isDisabled}
              accessible={true}
              accessibilityLabel={accessibilityStrings.audioPause}
              activeOpacity={0.5}
              onPress={onPausePlay}
            >
              <Icon name="pause" size={48} style={isDisabled ? styles.disabled : styles.icon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={isDisabled}
              activeOpacity={0.5}
              accessible={true}
              accessibilityLabel={accessibilityStrings.audioPlay}
              onPress={onStartPlay}
            >
              <Icon name="play" size={48} style={isDisabled ? styles.disabled : styles.icon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.5}
            onPress={onStopPlay}
            accessible={true}
            accessibilityLabel={accessibilityStrings.audioReset}
          >
            <Icon name="backward" size={48} style={isDisabled ? styles.disabled : styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.5}
            accessible={true}
            accessibilityLabel={accessibilityStrings.audioDelete}
            onPress={onRemoveRecord}
          >
            <Icon name="trash" size={48} style={isDisabled ? styles.disabled : styles.icon} />
          </TouchableOpacity>
        </View>
        <Text
          style={styles.txtCounter}
          accessible={true}
          accessibilityLabel={`${accessibilityStrings.audioPlayTime} ${voiceFriendlyDuration}`}
        >
          {playTime} / {duration}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    color: COLORS.black,
    marginLeft: 10,
  },
  disabled: {
    color: COLORS.gray,
    marginLeft: 15,
  },
  txtCounter: {
    marginTop: 15,
    color: COLORS.black,
    textAlignVertical: 'center',
    letterSpacing: 3,
    fontSize: 20,
  },
});
export default AudioRecorder;
