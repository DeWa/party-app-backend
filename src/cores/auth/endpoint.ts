import { BaseContext } from 'koa';
import * as Joi from 'joi';

import config from '../../config';

const postLoginBodySchema = Joi.object().keys({
  password: Joi.string().required(),
});

export default {
  postLogin: async (ctx: BaseContext) => {
    const validated = Joi.validate(ctx.request.body, postLoginBodySchema);

    if (validated.error) {
      ctx.status = 400;
      ctx.body = {
        error: validated.error,
      };
      return;
    }
    try {
      const reqBody = JSON.parse(ctx.request.body);
      if (reqBody.password === config.PASSWORD) {
        ctx.status = 200;
        ctx.body = JSON.stringify({
          apiKey: config.CLIENT_API_KEY,
        });
      } else {
        ctx.status = 403;
      }
    } catch (err) {
      ctx.status = 500;
      console.log(err);
    }
  },
};
