var test = require('tape');
var timeWindow = require('../');
var through = require('through');

test('object mode window', function (t) {
    t.plan(1);
    
    var tw = timeWindow({ size: 1000, objectMode: true });
    var writes = [];
    tw.pipe(through(write, end));
    
    tw.write({ msg: 'abc' });
    
    setTimeout(function () { tw.write({ msg: 'def' }) }, 500);
    setTimeout(function () { tw.write({ msg: 'hi' }) }, 2500);
    setTimeout(function () { tw.write({ msg: 'jkl' }); tw.end() }, 2600);
    
    function write (objs) {
        writes.push(objs);
    }
    
    function end () {
        t.deepEqual(writes, [
            [ { msg: 'abc' }, { msg: 'def' } ],
            [ { msg: 'hi' }, { msg: 'jkl' } ]
        ]);
    }
});
