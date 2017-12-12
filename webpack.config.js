const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = NODE_ENV === 'development'
    ? require('./webpack.dev.config')
    : require('./webpack.prod.config');