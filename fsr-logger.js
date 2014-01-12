var
  moment = require('moment'),
  fsr = require('file-stream-rotator');

/**
 * Neatly abstracts out the creation of file-stream-rotator configs
 *
 * @param {string} name
 * @param {string} frequency
 * @param {boolean} verbosity
 * @returns {{}}
 */
function create_fsr_config (name, frequency, verbosity) {
  var config = {}
  config.filename = name || './log/activity.log';
  config.frequency = frequency || 'daily';
  config.verbose = verbosity || false;
  return config;
}

/**
 * Creates a logger function based on the config
 *
 * Default config is:
 *
 * filename: ./log/activity.log
 * frequency: daily
 * verbose: false
 *
 * Returns a function that can be used to add messages to the logger
 *
 * @param {{filename: string, frequency: string, verbose: boolean}} streamConfig Config to create the file stream
 * @returns {function(string)}
 */
function create_logger (streamConfig) {
  var conf;

  if (! streamConfig) {
    conf = create_fsr_config();
  } else if (typeof streamConfig == 'string') {
    conf = create_fsr_config(streamConfig);
  } else {
    conf = streamConfig;
  }

  var stream = fsr.getStream(conf);

  return function(msg) {
    stream.write(moment().toISOString() + ' ' + msg + "\n");
  };
}

function create_noop_logger() {
  return function(){};
}

var loggers = {
  default: create_logger,
  noop: create_noop_logger
};

/**
 * Factory for returning the appropriate logger creator... factory.
 *
 * Yes, it's a factory factory.
 *
 * @param {string} type
 * @returns {create_logger}
 */
function get_logger_creator(type) {
  return loggers[type] ? loggers[type] : loggers.default;
}

module.exports = {
  create_logger: create_logger,
  create_fsr_config: create_fsr_config,
  get_logger_creator: get_logger_creator
};