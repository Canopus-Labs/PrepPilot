const express = require('express');
const router = express.Router();
const Sheet = require('../models/Sheet');

// POST /api/sheets/upload
// Body: { filename: "file.json", data: {...sheet data...} }
router.post('/upload', async (req, res) => {
  console.log('Received upload:', req.body.filename);
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

      // Insert or update sheet by id
      const sheet = await Sheet.findOneAndUpdate(
        { id: sheetObj.id },
        sheetObj,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      results.push({ message: 'Sheet saved to MongoDB.', id: sheet.id });
    }

    res.status(201).json({ uploaded: results.length, results });
  } catch (err) {
    console.error('Error saving to MongoDB:', err);
    res.status(500).json({ error: 'Failed to save sheet to database.' });
  }
});



// GET / - fetch all sheets (for /api/sheets)
router.get('/', async (req, res) => {
  try {
    const sheets = await Sheet.find({});
    res.json({ sheets });
  } catch (err) {
    console.error('Error fetching sheets:', err);
    res.status(500).json({ error: 'Failed to fetch sheets.' });
  }
});


// GET /:id - fetch single sheet by id (for /api/sheets/:id)
router.get('/:id', async (req, res) => {
  try {
    // Always find by custom id field (string)
    const sheet = await Sheet.findOne({ id: req.params.id });
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
