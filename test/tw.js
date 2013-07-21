var test = require('tape');
var timeWindow = require('../');
var through = require('through');

test('1-second window', function (t) {
    t.plan(1);
    
    var tw = timeWindow(1000);
    var bufs = [];
    tw.pipe(through(write, end));
    
    tw.write('abc');
    
    setTimeout(function () { tw.write('def') }, 500);
    setTimeout(function () { tw.write('hi') }, 2500);
    setTimeout(function () { tw.write('jkl'); tw.end() }, 2600);
    
    function write (buf) {
        bufs.push(buf.toString('utf8'));
    }
    
    function end () {
        t.deepEqual(bufs, [ 'abcdef', 'hijkl' ]);
    }
});
