const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./router/router');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

const { connectDatabase } = require('./database/database');


const server = app.listen(PORT, async () => {

    console.log(`App listening at http://localhost:${PORT}`);
    await initialize();
})


const initialize = async () =>{
    await connectDatabase();
}

app.use('/', router);

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});
