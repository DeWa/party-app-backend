import { BaseContext } from 'koa';
import * as Joi from 'joi';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

import { getImages, createCode, updateImage, getImageBySharecode } from './model';

const postCodeBodySchema = Joi.object().keys({
  code: Joi.string()
    .length(5)
    .required(),
});

const postImagePathSchema = Joi.object().keys({
  sharecode: Joi.string()
    .length(5)
    .required(),
});

const getImageBySharecodePathSchema = Joi.object().keys({
  sharecode: Joi.string()
    .length(5)
    .required(),
});

export default {
  getImageBySharecode: async (ctx: BaseContext) => {
    const validated = Joi.validate(ctx.params, getImageBySharecodePathSchema);
    if (validated.error) {
      ctx.status = 400;
      ctx.body = {
        error: validated.error,
      };
      return;
    }
    const sharecode = ctx.params.sharecode;
    const image = await getImageBySharecode(sharecode);

    if (!image) {
      ctx.status = 404;
    } else {
      ctx.status = 200;
      ctx.body = image;
    }
  },

  getImages: async (ctx: BaseContext) => {
    const images = await getImages();
    ctx.status = 200;
    ctx.body = images;
  },
  postCode: async (ctx: BaseContext) => {
    const validated = Joi.validate(ctx.request.body, postCodeBodySchema);

    if (validated.error) {
      ctx.status = 400;
      ctx.body = {
        error: validated.error,
      };
      return;
    }
    try {
      const code = await createCode(ctx.request.body.code);
      ctx.status = 200;
      ctx.body = code;
    } catch (err) {
      ctx.status = 500;
      console.log(err);
    }
  },
  postImage: async (ctx: BaseContext) => {
    const validated = Joi.validate(ctx.params, postImagePathSchema);

    if (validated.error) {
      ctx.status = 400;
      ctx.body = {
        error: validated.error,
      };
      return;
    }
    try {
      const { sharecode } = ctx.params;
      const image = await getImageBySharecode(sharecode);

      if (!image) {
        ctx.status = 404;
        return;
      } else if (image.uploaded) {
        ctx.status = 400;
        ctx.body = {
          message: 'Image already uploaded',
          status: 400,
        };
        return;
      }

      const file = ctx.request.files.image;
      const reader = fs.createReadStream(file.path);
      const stream = fs.createWriteStream(path.join(os.tmpdir(), file.name));
      reader.pipe(stream);
      // Write to database
      stream.on('close', async () => {
        try {
          await updateImage(sharecode, { filename: file.name, path: stream.path });
          console.log(`Finished uploading file ${file.name} on ${stream.path}`);
        } catch (err) {
          console.log(err);
        }
      });

      ctx.status = 200;
    } catch (err) {
      ctx.status = 500;
      console.log(err);
    }
  },
};
