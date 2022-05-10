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
} from 'react-native';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';

const nullTime = '00:00';
let audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.1);

const AudioRecorder = (props: { onAudioRecorded: (recordUri: string) => void }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordUri, setRecordUri] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [playTime, setPlayTime] = React.useState(nullTime);
  const [duration, setDuration] = React.useState(nullTime);

  const onStartRecord = async () => {
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
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setPlayTime(nullTime);
    });
  };

  const onStopRecord = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setIsRecording(false);
    setIsDisabled(false);

    props.onAudioRecorded(recordUri);
  };

  const onStartPlay = async () => {
    if (recordUri && isPaused) {
      await audioRecorderPlayer.resumePlayer();
    } else {
      await audioRecorderPlayer.startPlayer();
    }

    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      setPlayTime(
        audioRecorderPlayer.mmssss(Math.floor(e.currentPosition > 0 ? e.currentPosition : 0))
      );
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      console.log(playTime, duration, playTime === duration);
      if (playTime === duration) {
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

    props.onAudioRecorded('');

    onStopPlay();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {isRecording ? (
            <Icon name="stop" size={48} style={styles.icon} onPress={onStopRecord} />
          ) : (
            <Icon name="microphone" size={48} style={styles.icon} onPress={onStartRecord} />
          )}
          {isPlaying ? (
            <TouchableOpacity disabled={isDisabled} activeOpacity={0.5} onPress={onPausePlay}>
              <Icon name="pause" size={48} style={isDisabled ? styles.disabled : styles.icon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={isDisabled} activeOpacity={0.5} onPress={onStartPlay}>
              <Icon name="play" size={48} style={isDisabled ? styles.disabled : styles.icon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity disabled={isDisabled} activeOpacity={0.5} onPress={onStopPlay}>
            <Icon name="backward" size={48} style={isDisabled ? styles.disabled : styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity disabled={isDisabled} activeOpacity={0.5} onPress={onRemoveRecord}>
            <Icon name="trash" size={48} style={isDisabled ? styles.disabled : styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.txtCounter}>
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
