const { predictHandler } = require('./handler');
const getPredictionHistories = require('../services/predictionHistoryService'); // Import the new function

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
    {
        method: 'GET', // Add a new endpoint with the GET method
        path: '/predict/histories',
        handler: async (request, h) => {
            try {
                const histories = await getPredictionHistories();
                return h.response({
                    status: 'success',
                    data: histories,
                }).code(200);
            } catch (error) {
                console.error('Failed to fetch prediction histories:', error);
                return h.response({
                    status: 'fail',
                    message: 'Failed to fetch prediction histories',
                }).code(500);
            }
        },
    },
];

module.exports = routes;
