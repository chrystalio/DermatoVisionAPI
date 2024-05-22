const tf = require('@tensorflow/tfjs-node');
require('dotenv').config();

let model;

const loadModel = async () => {
    try {
        if (!model) {
            console.log(`Attempting to load model from: ${process.env.MODEL_URL}`);
            model = await tf.loadGraphModel(process.env.MODEL_URL);
            console.log('Model loaded successfully');
        }
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw error; // Rethrow the error to indicate that the model failed to load
    }
};

module.exports = loadModel;
