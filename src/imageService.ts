import ImageCropPicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import permissionService from './permissionService';

const imagePickerOptions: Options = {
  includeBase64: false,
  includeExif: true,
  mediaType: 'photo' as const,
  multiple: true,
  compressImageQuality: 0.2,
  compressImageMaxHeight: 2048,
  compressImageMaxWidth: 2048,
};

/**
 * @param {Options} [options]
 */
export const getFromPhotoLibrary = async (
  options?: Options,
): Promise<ImageOrVideo[]> => {
  await permissionService.verifyPhotoLibPermission();
  const response = await ImageCropPicker.openPicker({
    ...imagePickerOptions,
    ...options,
  });
  return Array.isArray(response) ? response : [response];
};

export default { getFromPhotoLibrary };
