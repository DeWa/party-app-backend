import * as Router from 'koa-router';
import config from './config';
import * as koaBody from 'koa-body';

import imageRoute from './cores/images/endpoint';

const router = new Router({ prefix: `/api/${config.API_VERSION}` });
// const imageRouter = new Router();

// Photobooth
router.post('/images', koaBody(), imageRoute.postCode);
router.post('/images/:sharecode', koaBody({ multipart: true }), imageRoute.postImage);
// Get all images
router.get('/images', imageRoute.getImages);
router.get('/images/:sharecode', imageRoute.getImageBySharecode);

// Get image by id
router.get('/', (ctx, next) => {
  // ctx.router available
});
// Get image by shareCode
// imageRouter.get('/', () => null);

// Admin panel

export default router;
