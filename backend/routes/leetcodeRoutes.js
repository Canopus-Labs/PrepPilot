const express = require('express');
const router = express.Router();

router.get('/:username', (req, res) => {
    // TODO: Implement LeetCode GraphQL fetch
    res.status(501).json({ message: "LeetCode integration pending" });
});

module.exports = router;
