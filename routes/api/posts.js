const express = require('express');
const router = express.Router();

// @route route get api/posts/test
// @desc Tests posts route
// @access public
router.get('/test', (req, res) => res.json({
    msg: 'Testing posts routes'
}));

module.exports = router;