fsr-logger
==========

Simple wrapper over file-stream-rotator that lets you make loggers easily

## Config

The default logger can be setup this way.

```
// Defaults to creating a daily log file in ./logs/activity.log
var log = require('fsr-logger').create_logger(); 
```

You can also use any config you use for file-stream-rotator

```
var log = require('fsr-logger').create_logger({filename: './log/activity.log', frequency: 'daily', verbose: false});
```

## Multiple log files
fsr-logger makes it easy to create multiple log files

```
var create_logger = require('fsr-logger').create_logger,
  log = create_logger(),
  error = create_logger('./log/error.log');

log("Outputs to ./log/activity.log");
error("Outputs to ./log/error.log");
```

