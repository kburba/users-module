const express = require('express');
const router = express.Router();

// @route route get api/profile/test
// @desc Tests profile route
// @access public
router.get('/test', (req, res) => res.json({
    msg: 'Testing profile routes'
}));

module.exports = router;