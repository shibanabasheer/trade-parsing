const express = require('express');
const multer = require('multer');
const { uploadCSV } = require('../controllers/tradeController');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// POST route to handle CSV file upload
router.post('/upload', upload.single('csvFile'), uploadCSV);

module.exports = router;
