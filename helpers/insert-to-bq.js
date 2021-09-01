const {BigQuery} = require('@google-cloud/bigquery');
const {Storage} = require('@google-cloud/storage');

const bigquery = new BigQuery();
const storage = new Storage();

const loadCSVFromGCS = async (fileUrl) => {
    try {
        const metadata = {
            sourceFormat: 'CSV',
            skipLeadingRows: 1,
            schema: {
                fields: [
                    { name: 'Usuario', type: 'STRING' },
                    { name: 'Puesto', type: 'STRING' },
                    { name: 'Sucursal', type: 'STRING' },
                    { name: 'Regional', type: 'STRING' },
                    { name: 'Subdirector', type: 'STRING' },
                    { name: 'Director', type: 'STRING' },
                    { name: 'Perfil', type: 'STRING' },
                ],
            },
            location: 'US',
        };
    
        // Load data from a Google Cloud Storage file into the table
        const [job] = await bigquery
            .dataset(process.env.DATASET)
            .table(process.env.TABLE)
            .load(storage.bucket(process.env.BUCKET_NAME).file(fileUrl), metadata);
    
        // Check the job's status for errors
        const errors = job.status.errors;
        if (errors && errors.length > 0) {
            throw errors;
        }
        return job
    } catch (error) {
        return ({error})
    }
}

module.exports = {
    loadCSVFromGCS
}