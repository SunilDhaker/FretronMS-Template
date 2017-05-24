var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');


module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URL || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    jwtSecret: "supersecretkey",
    jwtRefreshSecret: "superRefreshsecretkey",
    refreshExpiry: '3d',
    authExpiry: '1d',
    appVersion : "1.0.0",
    apnsDest : process.env.NODE_ENV =='production' ? process.env.NODE_ENV :'devTest'
};