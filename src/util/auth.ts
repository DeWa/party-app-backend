import { BaseContext } from 'koa';
import config from '../config';

export async function isClient(ctx: BaseContext, next: () => void) {
  const header = ctx.request.header;
  if (!header.authorization || header.authorization !== config.CLIENT_API_KEY) {
    ctx.status = 403;
    ctx.body = {
      message: 'Wrong API key',
    };
  } else {
    await next();
  }
}
