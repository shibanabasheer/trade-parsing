const csv = require('csv-parser');
const fs = require('fs');
const Trade = require('../models/Trades');

// Function to parse and save CSV data
const uploadCSV = (req, res) => {
  const results = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      // Parse market and split into base and quote coin
      const [base_coin, quote_coin] = data.Market.split('/');

      // Add parsed data to results array
      results.push({
        user_id: data.User_ID,
        utc_time: new Date(data.UTC_Time),
        operation: data.Operation,
        base_coin: base_coin,
        quote_coin: quote_coin,
        amount: data['Buy/Sell Amount'],
        price: data.Price,
      });
    })
    .on('end', async () => {
      try {
        // Save all the trade data to MongoDB
        await Trade.insertMany(results);
        res.status(200).json({ message: 'CSV file processed and data saved successfully.' });
      } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
      }
    });
};

module.exports = { uploadCSV };
