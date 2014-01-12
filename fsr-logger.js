var
  moment = require('moment'),
  sprintf = require('sprintf'),
  fsr = require('file-stream-rotator');

function create_simple_config (name, frequency, verbosity) {
  var config = {}
  config.filename = name || './log/activity.log';
  config.frequency = frequency || 'daily';
  config.verbose = verbosity || false;
  return config;
}

function create_logger (streamConfig) {

  if (! streamConfig) {
    streamConfig = create_simple_config();
  } else if (typeof streamConfig == 'string') {
    streamConfig = create_simple_config(streamConfig);
  }

  var stream = fsr.getStream(streamConfig);

  return function(msg) {
    stream.write(sprintf("%s %s\n", moment().toISOString(), msg));
  };
}

module.exports = {
  create_logger: create_logger
};