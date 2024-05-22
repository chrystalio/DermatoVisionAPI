// predictionHistoryService.js

const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const firestore = new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE,
});

const getPredictionHistories = async () => {
    try {
        const predictionsCollection = firestore.collection('predictions');
        const snapshot = await predictionsCollection.get();
        
        const histories = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                history: {
                    result: data.result,
                    createdAt: data.createdAt,
                    suggestion: data.suggestion,
                    id: doc.id
                }
            };
        });

        return histories;
    } catch (error) {
        console.error('Failed to fetch prediction histories:', error);
        throw error;
    }
};

module.exports = getPredictionHistories;
