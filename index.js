var Transform = require('readable-stream/transform');

module.exports = function (time) {
    var to = null;
    var buffer = [];
    var ended = false;
    
    var tr = new Transform;
    tr._transform = function (buf, enc, next) {
        var tr = this;
        if (typeof buf === 'string') buffer.push(Buffer(buf))
        else buffer.push(buf)
        
        if (!to) to = setTimeout(function () {
            tr.push(Buffer.concat(buffer));
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
