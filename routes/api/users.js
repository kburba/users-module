const express = require('express');
const router = express.Router();

// route get api/posts/test
// Tests posts route
// public 
router.get('/test', (req, res) => res.json({
    msg: 'Testing users routes'
}));

module.exports = router;