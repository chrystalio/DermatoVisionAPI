const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const firestore = new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE,
});

const storePrediction = async (imageData, prediction) => {
    const predictionsCollection = firestore.collection('predictions');
    const docRef = predictionsCollection.doc(prediction.id);

    // Create a new object with the nested structure
    const dataToStore = {
        data: {
            id: prediction.id,
            result: prediction.result,
            suggestion: prediction.suggestion,
            createdAt: prediction.createdAt,
        }
    };

    await docRef.set(dataToStore);

    console.log(`Stored prediction ${prediction.id} in Firestore.`);
};


module.exports = storePrediction;