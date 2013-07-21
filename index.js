var through = require('through');

module.exports = function (time) {
    var to = null;
    var buffer = [];
    var ended = false;
    
    return through(write, end);
    
    function write (buf) {
        var tr = this;
        if (typeof buf === 'string') buffer.push(Buffer(buf))
        else buffer.push(buf)
        
        if (!to) to = setTimeout(function () {
            tr.queue(Buffer.concat(buffer));
            buffer = [];
            if (ended) tr.queue(null);
            to = null;
        }, time);
    }
    
    function end () {
        ended = true;
        if (!to) this.queue(null)
    }
};
