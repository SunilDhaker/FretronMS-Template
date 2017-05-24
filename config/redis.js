/** Redis Datastore config **/

var redis = require('redis');
var redisClient = redis.createClient();

redis.debug_mode = true;

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

exports.redis = redis;
exports.redisClient = redisClient;
