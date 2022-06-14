const express = require('express');
const router = express.Router();

// Homepage
router.get('/', (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Hello World!!!"
    });
});


// Authentication


// Authentication Middleware


module.exports = router;