import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../assets/colors';

interface State {
  isPlaying: boolean;
  isRecording: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

class RecordUpload extends Component<any, State> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: any) {
    super(props);
    this.state = {
      isRecording: false,
      isPlaying: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }

  public render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            {this.state.isRecording ? (
              <Icon name="stop" size={48} style={styles.icon} onPress={this.onStopRecord} />
            ) : (
              <Icon name="microphone" size={48} style={styles.icon} onPress={this.onStartRecord} />
            )}

            {this.state.isPlaying ? (
              <Icon name="pause" size={48} style={styles.icon} onPress={this.onPausePlay} />
            ) : (
              <Icon name="play" size={48} style={styles.icon} onPress={this.onStartPlay} />
            )}
            <Icon name="backward" size={48} style={styles.icon} onPress={this.onStopPlay} />
          </View>
        </View>
      </>
    );
  }

  private onStartRecord = async () => {
    this.onStopPlay();
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

    const uri = await this.audioRecorderPlayer.startRecorder(undefined, audioSet);

    this.audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.log('record-back', e);
      this.setState({
        isRecording: true,
      });
    });
    console.log(`uri: ${uri}`);
  };

  private onStopRecord = async () => {
    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      isRecording: false,
    });
  };

  private onStartPlay = async () => {
    await this.audioRecorderPlayer.startPlayer();
    this.setState({ isPlaying: true });
  };

  private onPausePlay = async () => {
    this.setState({ isPlaying: false });
    await this.audioRecorderPlayer.pausePlayer();
  };

  private onStopPlay = async () => {
    this.setState({ isPlaying: false });
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
}

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
