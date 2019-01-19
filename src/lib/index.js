import async from './async';
import decorators from './decorators';
import net from './net';
import reactive from './reactive';
import Logger from './logger';
import service from './service';

export default {
  async,
  decorators,
  net,
  reactive,
  Logger,
  service,
  ONLINE: 'online',
  OFFLINE: 'offline',
  SILENT: 'silent',
  DEV: 'development',
  PROD: 'production',
};
