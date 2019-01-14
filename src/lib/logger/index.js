import moment from 'moment';

class Logger {
  constructor(props) {
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
    obj.type = LOGS_TYPE_LOG;
    this.currentSessionLogs.push(obj);
    if (this.props.console) {
      console.log(obj.text);
    }
  }

  warn(msg) {
    const obj = Logger.createMessage(msg);
    obj.type = LOGS_TYPE_WARN;
    this.currentSessionLogs.push(obj);
    if (this.props.console) {
      console.warn(obj.text);
    }
  }

  error(msg) {
    const obj = Logger.createMessage(msg);
    obj.type = LOGS_TYPE_ERROR;
    this.currentSessionLogs.push(obj);
    if (this.props.console) {
      console.error(obj.text);
    }
  }
}

export default Logger;
