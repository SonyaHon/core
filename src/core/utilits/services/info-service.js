const BaseService = require('../../../lib/service/base-service');
const Logger = require('../../../lib/logger');

class InfoService extends BaseService {
  constructor(name, methods) {
    super(name, {
      ...methods,
      getStatus: {},
      getExistingLogs: {},
      getLoggerName: {},
    });
    this.logger = new Logger({
      console: false,
      infoService: true,
    });
    this.logger.on('log-evt', (obj) => {
      this.fire('logs', obj);
    });
    this.status = {};
  }

  update() {
    this.fire('--STATUS--UPDATE--', this.status);
  }

  async getExistingLogs() {
    return this.logger.currentSessionLogs;
  }

  async getStatus() {
    return this.status;
  }

  async getLoggerName() {
    return this.name;
  }
}

module.exports = InfoService;
