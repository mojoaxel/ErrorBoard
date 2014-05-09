var aggregate = require('./aggregate');
var reduceTimestamps = require('./reduce-timestamps');
var reduceBrowsers = require('./reduce-browsers');

module.exports = aggregate({
    groupBy: 'message',
    create: {
        count: 0,
        browsers: []
    },
    each: function(obj, next) {
        obj.count += 1;

        reduceTimestamps(obj, next);
        reduceBrowsers(obj, next);
    }
});