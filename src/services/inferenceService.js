const tf = require('@tensorflow/tfjs-node');

const makePrediction = async (model, imageBuffer) => {
    if (!model) {
        throw new Error('Model not loaded');
    }

    // Decode the image buffer and resize it to the required dimensions
    let tensor = tf.node.decodeImage(imageBuffer, 3);
    tensor = tf.image.resizeBilinear(tensor, [224, 224]).expandDims();

    const prediction = model.predict(tensor);
    const result = prediction.dataSync()[0];
    return result;
};

module.exports = {
    makePrediction,
};
