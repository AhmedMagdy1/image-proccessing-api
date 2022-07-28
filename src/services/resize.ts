import { ImageObject } from '../routes/api/images';

import sharp = require('sharp');
const resizeImage = async (
  imageObject: ImageObject,
  inputImagePath: string,
  outputImagePath: string
) => {
  await sharp(inputImagePath)
    .resize(imageObject.width, imageObject.height)
    .toFile(outputImagePath);
};
export default resizeImage;
