# time-window-stream

concatenate all the data chunks that fall within a time window

[![testling badge](https://ci.testling.com/substack/time-window-stream.png)](https://ci.testling.com/substack/time-window-stream)

[![build status](https://secure.travis-ci.org/substack/time-window-stream.png)](http://travis-ci.org/substack/time-window-stream)

# example

Every time there is a write on stdin, wait 1 second to buffer up more data and
concatenate everything in that 1 second window together:

``` js
var timeWindow = require('time-window-stream');
var through = require('through');

var tw = timeWindow(1000);
process.stdin.pipe(tw).pipe(through(function (buf) {
    console.dir(buf.toString('utf8'));
}));
```

output:

```
$ (echo -n abc; sleep 0.5; echo -n def; sleep 2; echo -n hi; sleep 0.1; echo -n jkl) | node tw.js
'abcdef'
'hijkl'
```

`'abc'` and `'def'` are only separated by 0.5 seconds, so they get put into the
same chunk. The pause of 2 seconds breaks the chunk and then `'hi'` gets
concatenated to `'jkl'` because only 0.1 seconds elapsed between them.

# methods

``` js
var timeWindow = require('time-window-stream')
```

## var tw = timeWindow(time)

Create a new time window through stream `tw` that on a write will wait `time`
milliseconds to concatenate more writes together in the same batch.

# install

With [npm](https://npmjs.org) do:

```
npm install time-window-stream
```

# license

MIT
