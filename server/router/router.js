const express = require('express');
const router = express.Router();
const Parameters = require('../components/Parameters/parameters.controller');

router.get('/', (req, res) => {
    res.send('App is working...');
});

router.get('/getParams', async (req, res) => {
    return await Parameters.getParams(req, res);
});

router.post('/addParam', async (req, res) => {
    return await Parameters.addParam(req, res);
});

router.patch('/updateParam', async (req, res) => {
    return await Parameters.updateParam(req, res);
})

router.delete('/deleteParam', async (req, res) => {
    return await Parameters.deleteParam(req, res);
})

module.exports = router;