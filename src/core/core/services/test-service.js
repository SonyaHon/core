const InfoService = require('../../utilits/services/info-service');

class TestService extends InfoService {
  constructor() {
    super('Test Service', {
      createLog: {},
      createWarn: {},
      createError: {},
      changeStatus: {},
    });
    this.status = {
      a: 0,
      b: true,
      c: 'trash',
    };
    setTimeout(() => {
      this.logger.log('initiated');
    }, 5000);
  }

  createLog(log) {
    this.logger.log(log);
  }

  createWarn(warn) {
    this.logger.warn(warn);
  }

  createError(err) {
    this.logger.error(err);
  }

  changeStatus(status) {
    this.status = status;
  }
}

module.exports = TestService;
