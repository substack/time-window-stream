var timeWindow = require('../');
var through = require('through');

var tw = timeWindow(1000);
process.stdin.pipe(tw).pipe(through(function (buf) {
    console.dir(buf.toString('utf8'));
}));
