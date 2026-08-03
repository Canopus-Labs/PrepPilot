const express = require('express');
const router = express.Router();
const Sheet = require('../models/Sheet');
const { protect } = require('../middlewares/authMiddleware');
const {
  normalizeSheet,
  computeSheetStats,
} = require('../utils/sheetValidation');

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
      const normalized = normalizeSheet(sheetObj);
      if (!normalized.ok) {
        results.push({
          error: 'Invalid sheet data.',
          details: normalized.errors,
          sheet: sheetObj,
        });
        continue;
      }

      // Insert or update sheet by id
      const sheet = await Sheet.findOneAndUpdate(
        { id: normalized.value.id },
        normalized.value,
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

// POST /api/sheets/validate
// Body: { data: {...sheet data...} }
// Dry-run: returns stats + errors without writing to the DB.
router.post('/validate', protect, async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Sheet data is required.' });
  }

  const sheetsArr = Array.isArray(data.sheets) ? data.sheets : [data];
  const results = [];

  for (const sheetObj of sheetsArr) {
    const normalized = normalizeSheet(sheetObj);
    if (!normalized.ok) {
      results.push({
        id: sheetObj && sheetObj.id ? sheetObj.id : null,
        ok: false,
        errors: normalized.errors,
      });
      continue;
    }
    results.push({
      id: normalized.value.id,
      title: normalized.value.title,
      ok: true,
      stats: computeSheetStats(normalized.value),
    });
  }

  const invalidCount = results.filter((r) => !r.ok).length;
  res.json({
    valid: results.length - invalidCount,
    invalid: invalidCount,
    total: results.length,
    results,
  });
});

// PUT /api/sheets/:id
// Update a single sheet after validation.
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const body = req.body && req.body.sheet ? req.body.sheet : req.body;

  const normalized = normalizeSheet(body);
  if (!normalized.ok) {
    return res.status(400).json({ error: 'Invalid sheet data.', details: normalized.errors });
  }

  if (normalized.value.id && normalized.value.id !== id) {
    return res.status(400).json({ error: 'Sheet id in body does not match URL id.' });
  }

  try {
    const sheet = await Sheet.findOneAndUpdate(
      { id },
      normalized.value,
      { new: true, setDefaultsOnInsert: true }
    );

    if (!sheet) {
      return res.status(404).json({ error: 'Sheet not found.' });
    }

    res.json({ message: 'Sheet updated.', sheet });
  } catch (err) {
    console.error('Error updating sheet:', err);
    res.status(500).json({ error: 'Failed to update sheet.' });
  }
});

// DELETE /api/sheets/:id
// Requires confirmId matching :id to prevent accidental deletion.
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { confirmId } = req.body || {};

  if (confirmId !== id) {
    return res.status(400).json({ error: 'confirmId must match the sheet id.' });
  }

  try {
    const sheet = await Sheet.findOneAndDelete({ id });

    if (!sheet) {
      return res.status(404).json({ error: 'Sheet not found.' });
    }

    res.json({ message: 'Sheet deleted.', id });
  } catch (err) {
    console.error('Error deleting sheet:', err);
    res.status(500).json({ error: 'Failed to delete sheet.' });
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
    // Always find by cust
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
