import ImageCropPicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import permissionService from './permissionService';

const imagePickerOptions: Options = {
  compressImageQuality: 0.1,
  compressImageMaxWidth: 2048,
  includeBase64: false,
  includeExif: true,
  mediaType: 'photo' as const,
  multiple: true,
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
