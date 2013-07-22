var Transform = require('readable-stream/transform');

module.exports = function (time, opts) {
    if (typeof time === 'object') {
        opts = time;
        time = opts.time;
    }
    if (!opts) opts = {};
    var objectMode = Boolean(opts.objectMode);
    
    var to = null;
    var buffer = [];
    var ended = false;
    
    var tr = new Transform({ objectMode: objectMode });
    tr._transform = function (buf, enc, next) {
        var tr = this;
        if (typeof buf === 'string') buffer.push(Buffer(buf))
        else buffer.push(buf)
        
        if (!to) to = setTimeout(function () {
            if (objectMode) tr.push(buffer)
            else tr.push(Buffer.concat(buffer))
            
            buffer = [];
            if (ended) tr.push(null);
            to = null;
        }, time);
        
        next();
    };
    
    tr._flush = function () {
        ended = true;
        if (!to) tr.push(null)
    };
    
    return tr;
};
