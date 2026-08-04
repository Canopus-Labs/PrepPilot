const express = require('express');
const router = express.Router();
const Sheet = require('../models/Sheet');
const { protect } = require('../middlewares/authMiddleware');

// POST /api/sheets/upload
// Body: { filename: "file.json", data: {...sheet data...} }
router.post('/upload', protect, async (req, res) => {
  const { filename, data } = req.body;

  if (!filename || !data) {
    return res.status(400).json({ error: 'Filename and data are required.' });
  }
  if (!filename.endsWith('.json')) {
    return res.status(400).json({ error: 'Filename must end with .json' });
  }

  try {
    // Normalize input: either { sheets: [...] } or a single sheet object
    const sheetsArr = Array.isArray(data.sheets) ? data.sheets : [data];
    const results = [];

    for (const sheetObj of sheetsArr) {
      if (!sheetObj || !sheetObj.id || !sheetObj.title) {
        results.push({ error: 'Invalid sheet data. Each sheet needs id & title.', sheet: sheetObj });
        continue;
      }

      // Insert or update the sheet scoped to the authenticated owner. The
      // filter uses { id, owner }, so a user can never overwrite another
      // user's sheet even when ids collide.
      const sheet = await Sheet.findOneAndUpdate(
        { id: sheetObj.id, owner: req.user._id },
        { ...sheetObj, owner: req.user._id },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      results.push({ message: 'Sheet saved to MongoDB.', id: sheet.id });
    }

    res.status(201).json({ uploaded: results.length, results });
  } catch (err) {
    if (err.code === 11000) {
      // The compound { id, owner } index rejected the upsert — e.g. a legacy
      // sheet without an owner already holds this id. Surface it clearly.
      return res.status(409).json({ error: 'A sheet with this id already exists.' });
    }
    console.error('Error saving to MongoDB:', err);
    res.status(500).json({ error: 'Failed to save sheet to database.' });
  }
});



// GET / - fetch the authenticated user's sheets
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const total = await Sheet.countDocuments({});
    const sheets = await Sheet.find({})
      .skip(skip)
      .limit(limit);

    res.json({
      sheets,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
    const sheets = await Sheet.find({ owner: req.user._id });
    res.json({ sheets });
  } catch (err) {
    console.error('Error fetching sheets:', err);
    res.status(500).json({ error: 'Failed to fetch sheets.' });
  }
});


// GET /:id - fetch a single sheet owned by the authenticated user
router.get('/:id', protect, async (req, res) => {
  try {
    // Always find by custom id field (string) scoped to the owner
    const sheet = await Sheet.findOne({ id: req.params.id, owner: req.user._id });
    if (!sheet) {
      return res.status(404).json({ error: 'Sheet not found.' });
    }
    res.json({ sheet });
  } catch (err) {
    console.error('Error fetching sheet:', err);
    res.status(500).json({ error: 'Failed to fetch sheet.' });
  }
});

module.exports = router;
