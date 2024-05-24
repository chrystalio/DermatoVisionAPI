# DermatoVisionAPI

DermatoVisionAPI is a RESTful API for dermatological image analysis. It focuses on predicting whether a skin condition is cancerous or not based on input images.

## Features

- **Cancer Detection**: Given an input image, the API predicts whether the skin condition is cancerous or not.
- **Model Storage**: The API provides functionality to load and manage the machine learning model used for prediction.
- **Input Validation**: Input images are validated to ensure they meet the necessary criteria before prediction.

## Prerequisites

- Node.js (v20.12.2)
- Google Cloud SDK
- Docker
- A Google Cloud Project

## Local Development

1. Clone the repository:

    ```sh
    git clone https://github.com/chrystalio/DermatoVisionAPI.git
    ```

2. Change the directory:

    ```sh
    cd DermatoVisionAPI
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

4. **[OPTIONAL]** Upload your model to a Google Cloud Storage bucket. The model files are inside the `model` directory.

5. If you prefer to load the model data from the local directory, you can refer to it directly from the `model` directory.

6. Create a new service account in Google Cloud and assign the `Cloud Datastore Owner` role. 

7. Download the JSON key for the service account, store it inside the `config` folder, and rename it to `service.json`.

8. Ensure your `config/service.json` contains your Google Cloud credentials.

9. Enable [Firestore API](https://console.cloud.google.com/flows/enableapi?apiid=firestore.googleapis.com).

10. Open `Google Cloud Console → Firestore`, then click `Create Database`.

11. Choose `Native Mode`, select your region, and create the database.

12. Set up your environment variables. Create a `.env` file in the root directory and add the following:

    ```plaintext
    APP_ENV=local
    MODEL_URL=https://storage.googleapis.com/your-bucket/model.json
    GCLOUD_PROJECT_ID=your-project-id
    GCLOUD_KEY_FILE=config/service.json
    ```

    Or if you are not uploading the model to a cloud storage bucket, set it like this:

    ```plaintext
    APP_ENV=local
    MODEL_URL=./model/model.json
    GCLOUD_PROJECT_ID=your-project-id
    GCLOUD_KEY_FILE=config/service.json
    ```

13. Start the server:

    ```sh
    npm run start:dev
    ```

## Troubleshooting
If you encounter issues with permissions or environment variables, ensure that:

Your Google Cloud credentials are correctly set up in the config/credentials.json file.
The environment variables in the .env file are correctly configured.
The IAM roles for your service account have the necessary permissions.

## Acknowledgements
- Thanks to the Dicoding team for providing the machine learning model.
- Special thanks to the Google Cloud Platform for providing the infrastructure.

```plaintext
Make sure to replace placeholder values (like `your-project-id`, `your-bucket`) with the actual values for your project. Additionally, include any other specific setup instructions or dependencies unique to your project.
```