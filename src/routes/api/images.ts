import express from 'express';
import resizeImage from '../../services/resize';
import { query, validationResult } from 'express-validator';
import validate from '../../middleware/processing-validation';
const image = express.Router();
import fs = require('fs');
export interface ImageObject {
  name: string;
  width: number;
  height: number;
}
import path = require('path');

image.get(
  '/',
  validate,
  async (req: express.Request, res: express.Response) => {
    const imageObject: ImageObject = {
      name: req.query.name as string,
      width: parseInt(req.query.width as string),
      height: parseInt(req.query.height as string),
    };

    const inputImagePath = `./images/input/${imageObject.name}.jpg`;
    const outputImagePath = `./images/output/${imageObject.name}_${imageObject.width}_${imageObject.height}.jpg`;

    if (isExistImage(outputImagePath)) {
      res.sendFile(absloutePath(outputImagePath));
      return;
    }

    if (isExistImage(inputImagePath)) {
      await resizeImage(imageObject, inputImagePath, outputImagePath);
      res.sendFile(absloutePath(outputImagePath));
      return;
    }

    res.json({
      Message: "Image is n't exist",
    });
  }
);

function isExistImage(outputImagePath: string): boolean {
  return fs.existsSync(outputImagePath);
}

function absloutePath(filePath: string): string {
  return path.resolve(filePath);
}

export default image;
