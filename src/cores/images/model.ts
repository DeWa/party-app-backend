import knex from '../../db';
import { camelizeKeys } from 'humps';
import * as moment from 'moment';

import { IImage } from './type';

interface IImageUploadUpdate {
  filename: string;
  path: string | Buffer;
  thumbnail: string;
}
export const getImages = async () => {
  return await knex
    .select('*')
    .from('images')
    .then((images: any) => {
      return images.map((i: IImage) => camelizeKeys(i)) as IImage[];
    });
};

export const getImageBySharecode = async (sharecode: string) => {
  return await knex
    .select('*')
    .from('images')
    .where({ code: sharecode })
    .then((rows: any) => {
      return camelizeKeys(rows[0]) as IImage;
    });
};

export const createCode = async (code: string) => {
  return await knex('images')
    .insert({
      code,
      expires: moment().add(2, 'days'),
    })
    .returning('code');
};

export const updateImage = async (code: string, imageData: IImageUploadUpdate) => {
  return await knex('images')
    .where({ code })
    .update({
      filename: imageData.filename,
      path: imageData.path,
      thumbnail: imageData.thumbnail,
      updated_at: knex.fn.now(),
      uploaded: true,
    });
};
