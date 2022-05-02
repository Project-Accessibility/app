import { Image, Video, Audio } from 'react-native-compressor';
import { CompressFileType } from '../../enums/CompressFileType';

const compressFile = async (fileType: CompressFileType, value: string) => {
  console.log('Compressing ' + fileType + ' with value ' + value);
  switch (fileType) {
    case CompressFileType.IMAGE:
      const imageResult = await Image.compress(value, {
        compressionMethod: 'auto',
        input: 'base64',
      });
      return imageResult;
    case CompressFileType.VIDEO:
      const videoResult = await Video.compress(value, {
        compressionMethod: 'auto',
      });
      return videoResult;
    case CompressFileType.VIDEO:
      const audioResult = await Audio.compress(value, {
        quality: 'medium',
      });
      return audioResult;
    default:
      throw new Error(`Unknown file type '${fileType}'`);
  }
};

const compressAndUpload = async (fileType: CompressFileType, value: string) => {
  const compressedFile = await compressFile(fileType, value);
  return compressedFile;
};

export { compressFile, compressAndUpload };
