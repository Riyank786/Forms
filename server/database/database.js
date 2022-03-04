const mongoose = require('mongoose');

const dbConnection = {
    uri:  'mongodb+srv://edutech:DS6cSY8Zelmrn7X5@cluster0.8pmcd.mongodb.net/Device_Parameter?authSource=admin&replicaSet=atlas-a5isg6-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
};

const connectDatabase = async () => {
    new Promise((resolve) => {
        console.info(`connecting database: ${dbConnection.uri}`);
        try {
            mongoose
            .connect(dbConnection.uri, dbConnection.options)
            .then(x => {
              console.info(
                `Connected to Mongo! Database name: "${x.connections[0].name}"`
              );
              resolve({ error: false });

            })
            .catch(err => {
              console.error("Error connecting to mongo", err);
              resolve({ error: true });

            });
        }
        catch (err) {
            console.error(err.message);
            resolve({ error: true });
        }
    })
}

const dbErrorHandler = (error) => {
    console.error("Db connection error");
    console.error(error.message);
    process.exit(1);
}

module.exports = { connectDatabase };

