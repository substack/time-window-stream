var wconcat = require('../');
var through = require('through');

var wcs = wconcat(1000);
process.stdin.pipe(wcs).pipe(through(function (buf) {
    console.dir(buf.toString('utf8'));
}));
