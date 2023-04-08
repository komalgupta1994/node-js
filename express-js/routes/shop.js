const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('in middleware');
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // next(); // Allows the request to continue to the next middleware in the line, without next it will not go in next use method
})

module.exports = router;