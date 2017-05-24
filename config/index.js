'use strict';

var _ = require('lodash');

module.exports = _.extend(
    require(__dirname + '/../config/env/common'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {}
);
