require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    try {
        console.log('Initializing model...');
        const model = await loadModel();
        server.app.model = model;
        console.log('Model initialized and attached to server.');
    } catch (error) {
        console.error('Failed to load model:', error);
        process.exit(1); // Exit the process if the model fails to load
    }

    server.route(routes);

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server started at: ${server.info.uri}`);
})();
