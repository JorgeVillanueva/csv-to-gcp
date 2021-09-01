const { Storage } = require('@google-cloud/storage')
const { v4: uuidv4 } = require("uuid")

const storage = new Storage()

const listBuckets = async () => {
    try {
        const results = await storage.getBuckets();

        const [buckets] = results;

        console.log('Buckets:');
        buckets.forEach(bucket => {
        console.log(bucket.name);
        });
    } catch (err) {
        console.error('ERROR:', err);
    }
}

const uploadCSV = async (csvPath) => {
    try {        
        const res = await storage.bucket(process.env.BUCKET_NAME).upload(csvPath, {
            destination: `${uuidv4()}.csv`,
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            },
        });
        return ({res})
    } catch (error) {
        console.log(error)
        return ({error})
    }

}

module.exports = {
    listBuckets,
    uploadCSV
}