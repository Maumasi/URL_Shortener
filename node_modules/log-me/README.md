# log-me
[ ![Codeship Status for Maumasi/log-me](https://app.codeship.com/projects/14dc3950-76fc-0134-4753-66e71ebe4071/status?branch=master)](https://app.codeship.com/projects/179752)
</br>
**log-me** is a simple logging tool you can use to log events to a console. You can think of this as a more powerful ` console.log() ` which gives more robust information about the events happening in the core functionality.
</br>

### Important:
This package was written in ` node v6.7.0 `

### Notes:
When reviewing this package documentation we're going to stage a couple basic outlines:

- We're going to just call the root directory of your app ` ROOT `

- If you didn't know what ` __filename ` is, it's a node variable that is set to the current file's path location. There, now you know.

- We're also going to assume that you already know what node environment variables are, if you don't here are a couple articles to get you up to speed:
  - [How to setup an environmental variables file] (https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f#.41s7ws32x)
  - [How to set environment variables in the terminal] (http://stackoverflow.com/questions/9198310/how-to-set-node-env-to-production-development-in-os-x)
</br>

___

## Install

To install as a dependency:
```bash

$ cd ROOT/
$ npm i --save log-me

```
</br>

## Usage

### Code examples
At the top of a file you are going to use an instance of ` log-me ` set to a ` const `:
```javascript

const log = require('log-me');

```

When using your new tool, ` log.print `, there are a few parameters to play with:</br>
Parameter position:
  1. **` error ` | [required]**: Capture an error stack trace commonly represented as ` err ` in node.

  2. **` filePath ` | [optional]**: While this is an optional parameter you should always set this to ` __filename ` whenever you call a ` log-me ` instance or else it will default to ` log-me `'s module file path.

  3. **` customMessage ` | [optional]**: This is a string value that will be used as the log message header.

  4. **` customDescription ` | [optional]**: This is a string value. The description should be used if the purpose for the log is more complex then can be described in a few words using the ` customMessage ` parameter.

  5. **` reportLevel ` | [optional]**: This takes a numeric value of `0`, `1`, or `2`.
     - This is used against an array, ` ['Info', 'Warning', 'Error'] `.
     - By default this is set to index ` 0 `['Info'], but if an error is passed in at parameter 1 and the error has a stack trace then this will automatically be change to index ` 2 `['Error'].
     - Index ` 1 `['Warning'] will only be used if entered as so.

```javascript

// extend the `log-me` module to this file
const log = require('log-me');


// parameters
log.print(err, filePath = __filename, customMessage = 'none', customDescription = 'none', reportLevel = 0);


// only log the stack trace
danceMonkeyDance(err, dance) {
  // ... some code ...
  if (err) {
    log.print(err, __filename);
  }
}


// if there's no error to pass in but you want to log an event just set the first parameter to `null`
log.print(null, __filename,
  'Header for custom log message',
  'A more descriptive explanation for the reason I put a log here.');


// change the reportLevel to index of 'Warning'
log.print(null, __filename,
  'An unexpected event that could be a problem later',
  'A well deserved explanation as to what you suspect triggered this `Warning` log.',
  1 // <-------- index of `Warning` status
);

```
___

## DEBUG mode

The best way to do this is to set `DEBUG=true` in the terminal. If you have a server script that runs your App at the `ROOT/` directory level then you call just past in the following commands, assuming that you server script is called `server.js`.

```bash

$ cd ROOT/
$ DEBUG=true node server.js

```
</br>

Then of course, to exit DEBUG mode you'll have to stop the server.
```bash

$ cd ROOT/
$ ^C

```
**Note:**
To enter ` ^C ` you just to press `control` and `c` at the same time.
</br>


### Example output
An example log output to the terminal would look like this:
```

Log Report: Info
created at: Wed Oct 12 2016 21:42:28 GMT-0400 (EDT)
report type: Info
custom message: Server Active
custom description: Server running on port 3000
file path: ROOT/server.js
stack trace: null

```
The only exception to this example out put is that it would actually be colored text for better contrast
</br>

### Version bumper
This utility tool also features the version bumper, that will output to console the new version depending on 2 parameters: `version` and `type`. `version` is just a number (ex. `10.3.105`), and `type` may be one of three: `major`, `minor`, or `patch`. If you are unfamiliar with semantic versioning, take a look at [this site](http://semver.org/). You will still need to have this piece of code in your file:
```javascript

const log = require('log-me');

```

You will be able to use version bumper like so:
```javascript

log.bump('10.5.13', 'minor');

```

Having these parameters, console will print out this:
```
New version number is: 10.6.0
```
