import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
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

interface MyProps {
  isPlaying: boolean;
  isRecording: boolean;
  recordUri: string;
  isDisabled: boolean;
  playTime: string;
  duration: string;
}
class AudioRecorder extends Component<
  { onAudioRecorded: (recordUri: string) => void } | {},
  MyProps
> {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: MyProps) {
    super(props);
    this.state = {
      isRecording: false,
      isPlaying: false,
      recordUri: '',
      isDisabled: true,
      playTime: '00:00:00',
      duration: '00:00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1);
  }

  public render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Text style={styles.txtCounter}>
              {this.state.playTime} / {this.state.duration}
            </Text>
            {this.state.isRecording ? (
              <Icon name="stop" size={48} style={styles.icon} onPress={this.onStopRecord} />
            ) : (
              <Icon name="microphone" size={48} style={styles.icon} onPress={this.onStartRecord} />
            )}
            {this.state.isPlaying ? (
              <TouchableOpacity
                disabled={this.state.isDisabled}
                activeOpacity={0.5}
                onPress={this.onPausePlay}
              >
                <Icon
                  name="pause"
                  size={48}
                  style={this.state.isDisabled ? styles.disabled : styles.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={this.state.isDisabled}
                activeOpacity={0.5}
                onPress={this.onStartPlay}
              >
                <Icon
                  name="play"
                  size={48}
                  style={this.state.isDisabled ? styles.disabled : styles.icon}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              disabled={this.state.isDisabled}
              activeOpacity={0.5}
              onPress={this.onStopPlay}
            >
              <Icon
                name="backward"
                size={48}
                style={this.state.isDisabled ? styles.disabled : styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={this.state.isDisabled}
              activeOpacity={0.5}
              onPress={this.onRemoveRecord}
            >
              <Icon
                name="trash"
                size={48}
                style={this.state.isDisabled ? styles.disabled : styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  private onStartRecord = async () => {
    this.onStopPlay();
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
    this.setState({
      recordUri: await this.audioRecorderPlayer.startRecorder(undefined, audioSet),
      isRecording: true,
    });

    this.audioRecorderPlayer.addRecordBackListener(() => {
      //TODO need state properties for view showing position of playtime
      this.setState({});
    });
  };

  private onStopRecord = async () => {
    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      isRecording: false,
      isDisabled: false,
    });
  };

  private onStartPlay = async () => {
    await this.audioRecorderPlayer.startPlayer();
    this.audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      this.setState({
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      if (this.state.playTime === this.state.duration) {
        this.setState({ isPlaying: false });
      }
    });
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

  onRemoveRecord = () => {
    this.setState({
      recordUri: '',
      isDisabled: true,
      playTime: '00:00:00',
      duration: '00:00:00',
    });
    this.onStopPlay();
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'flex-end',
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
    marginLeft: 10,
  },
  txtCounter: {
    marginTop: 12,
    color: COLORS.black,
    textAlignVertical: 'center',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});
export default AudioRecorder;
