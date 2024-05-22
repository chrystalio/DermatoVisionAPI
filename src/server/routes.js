const { predictHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: predictHandler,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 1000000,
                multipart: true,
            },
        },
    },
];

module.exports = routes;
