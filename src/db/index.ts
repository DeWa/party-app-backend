import * as knex from 'knex';
import config from '../config';

const knexfile = require('../../../knexfile');

export default knex(knexfile[config.NODE_ENV]);
