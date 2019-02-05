const moment = require('moment');
const Events = require('events')

class Logger extends Events {
  constructor(props) {
    super();
    this.currentSessionLogs = [];
    this.props = props;
  }

  static createMessage(msg) {
    return {
      timestamp: moment().format('LLLL'),
      text: msg,
      type: null,
    };
  }

  log(msg) {
    const obj = Logger.createMessage(msg);
    obj.type = 'log';
    this.currentSessionLogs.push(obj);
    if (this.props.console) {
      console.log(obj.text);
    }
    if (this.props.infoService) {
      this.emit('log-evt', obj);
    }
  }

  warn(msg) {
    const obj = Logger.createMessage(msg);
    obj.type = 'warn';
    this.currentSessionLogs.push(obj);
    if (this.props.console) {
      console.warn(obj.text);
    }
    if (this.props.infoService) {
      this.emit('log-evt', obj);
    }
  }

  error(msg) {
    const obj = Logger.createMessage(msg);
    obj.type = 'error';
    this.currentSessionLogs.push(obj);
    if (this.props.console) {
      console.error(obj.text);
    }
    if (this.props.infoService) {
      this.emit('log-evt', obj);
    }
  }
}

module.exports = Logger;
