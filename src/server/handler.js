const { makePrediction } = require('../services/inferenceService');
const storePrediction = require('../services/storeData');
const InputError = require('../exceptions/InputError');
const { v4: uuidv4 } = require('uuid');

const predictHandler = async (request, h) => {
    const { image } = request.payload;

    if (!image) {
        return h.response({
            status: 'fail',
            message: 'Image is required',
        }).code(400);
    }

    // Check if image size exceeds 1MB
    if (image.bytes > 1_000_000) {
        return h.response({
            status: 'fail',
            message: 'Payload content length greater than maximum allowed: 1000000',
        }).code(413);
    }

    try {
        const model = request.server.app.model;
        const predictionResult = await makePrediction(model, image._data);

        // Custom validation for prediction result
        if (predictionResult !== 1 && predictionResult !== 0) {
            throw new InputError('Invalid prediction result');
        }

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
        console.error('Prediction error:', error.message);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(400);
    }
};

module.exports = {
    predictHandler,
};
