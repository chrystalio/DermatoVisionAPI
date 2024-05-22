const { makePrediction } = require('../services/inferenceService');
const storePrediction = require('../services/storeData');
const InputError = require('../exceptions/InputError');
const { v4: uuidv4 } = require('uuid');

const predictHandler = async (request, h) => {
    const { image } = request.payload;

    if (!image) {
        throw new InputError('Image is required');
    }

    if (image.bytes > 1000000) {
        throw new InputError('Image size must be less than 1MB');
    }

    try {
        const model = request.server.app.model;
        const predictionResult = await makePrediction(model, image._data);
        const result = predictionResult === 1 ? 'Cancer' : 'Non-cancer';
        const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Tetap jaga kesehatan kulit Anda.';

        const prediction = {
            id: uuidv4(),
            result: result,
            suggestion: suggestion,
            createdAt: new Date().toISOString(),
        };

        await storePrediction(image._data, prediction);

        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data: prediction,
        }).code(201);
    } catch (error) {
        console.error('Prediction error:', error);
        return h.response({ status: 'fail', message: error.message }).code(500);
    }
};

module.exports = {
    predictHandler,
};
