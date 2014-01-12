var
  fsr = require('file-stream-rotator');

function create_logger (streamConfig) {

  streamConfig = streamConfig || {
      filename: './log/activity.log',
      frequency: 'daily',
      verbose: false
    };

  var stream = fsr.getStream(streamConfig);

  return function(msg) {
    stream.write(sprintf("%s %s\n", moment().toISOString(), msg));
  };
}

module.exports = create_logger;
module.exports.fileStreamRotator = fsr;