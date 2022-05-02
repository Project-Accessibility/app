import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';
import permissionCheck from '../utility/PermissionCheck';
import { PERMISSIONS } from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const RecordUpload = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [voice, setVoice] = useState('');

  const RequestMicPermission = async () => {
    //check ios record
    permissionCheck.checkPermission(PERMISSIONS.IOS.MICROPHONE);

    //check android record
    permissionCheck.checkPermission(PERMISSIONS.ANDROID.RECORD_AUDIO);
    permissionCheck.checkPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    permissionCheck.checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    onStartRecord();
  };

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e: { currentPosition: number }) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
    setIsRecording(true);
    console.log(result);
    setVoice(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    setIsRecording(false);
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    await audioRecorderPlayer.startPlayer();
    setIsPlaying(false);
    audioRecorderPlayer.addPlayBackListener((e: { currentPosition: number; duration: number }) => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      console.log(currentDurationSec, currentPositionSec);
      return;
    });
  };

  const onPausePlay = async () => {
    console.log('onPausePlay');
    await audioRecorderPlayer.pausePlayer();
    setIsPlaying(true);
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {isRecording ? (
            <Icon name="stop" size={48} style={styles.icon} onPress={() => onStopRecord()} />
          ) : (
            <Icon
              name="microphone"
              size={48}
              style={styles.icon}
              onPress={() => RequestMicPermission()}
            />
          )}
          {isPlaying ? (
            <Icon name="play" size={48} style={styles.icon} onPress={() => onStartPlay()} />
          ) : (
            <Icon name="pause" size={48} style={styles.icon} onPress={() => onPausePlay()} />
          )}
          <Icon name="undo" size={48} style={styles.icon} onPress={() => onStopPlay()} />
          <Icon name="backward" size={48} style={styles.icon} onPress={() => onStopPlay()} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imagePadding: {
    paddingEnd: 15,
  },
  icon: {
    color: COLORS.black,
    marginLeft: 10,
  },
  imgStyle: {
    width: 150,
    height: 150,
    resizeMode: 'center',
    alignSelf: 'center',
  },
});
export default RecordUpload;
