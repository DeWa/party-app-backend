import * as Router from 'koa-router';
import config from './config';
import * as koaBody from 'koa-body';

import { isClient, isPhotobooth } from './util/auth';

import imageRoute from './cores/images/endpoint';
import authRoute from './cores/auth/endpoint';

const router = new Router({ prefix: `/api/${config.API_VERSION}` });

// Photobooth
router.post('/images', koaBody(), isPhotobooth, imageRoute.postCode);
router.post('/images/:sharecode', koaBody({ multipart: true }), isPhotobooth, imageRoute.postImage);

// Get all images
router.get('/images', isClient, imageRoute.getImages);
router.get('/images/:sharecode', isClient, imageRoute.getImageBySharecode);

router.get('/get/thumb/:name', imageRoute.getThumbBinaryImage);
router.get('/get/:name', imageRoute.getBinaryImage);

// Temporary Auth
router.post('/login', koaBody(), authRoute.postLogin);

export default router;
