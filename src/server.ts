import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as helmet from 'koa-helmet';

import config from './config';

import router from './router';

const app = new Koa();
app.use(logger());
app.use(helmet());

app.use(router.routes()).use(router.allowedMethods());

app.listen(parseInt(config.PORT, 10), '0.0.0.0');
console.log(`listening on port ${config.PORT}`);
