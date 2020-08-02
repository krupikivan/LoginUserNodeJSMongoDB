const { Router } = require('express');
const router = Router();
const verify = require('./verifyToken');
const db = require('../database');

router.get('/', verify, (req, res) => {
    res.json({
        status: true,
    });
});


module.exports = router;