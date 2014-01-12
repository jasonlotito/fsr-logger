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

## Output sample

Using the above error() function output:

```
2014-01-12T16:28:11.215Z Outputs to ./log/error.log
```

## Use the logger creator factory

This makes creating loggers that only run in certain conditions easy.

```
create_debug_logger = require('fsr-logger').get_logger_creator('noop');
debug = create_debug_logger('./log/debug.log');
debug('This will output nothing');
```


```
create_debug_logger = require('fsr-logger').get_logger_creator(); // or passed 'default'
debug = create_debug_logger('./log/debug.log');
debug('This will output to ./log/debug.log');
```

However, changing noop to be 'default' (or nothing) will result in normal logger file behavior.  How is this useful?  Using this, you can use debug()
log functionality in your code, and pass to get_logger_creator either 'noop' or 'default' based on the environment, or from the command line.  You
don't have to worry about messy if checks.