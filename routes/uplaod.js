const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://Easyhaiba01:Easyhaiba01@cluster0.df6lr.mongodb.net/?retryWrites=true&w=majority';

// CSV file path
const csvFilePath = '../SeatPricing.csv';

// Database and collection names
const dbName = 'Flurn';
const collectionName = 'seatspricings';
const documents = [];
// Read CSV file and upload data to MongoDB Atlas
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (data) => {
    console.log(data);
    const {id,seat_class,min_price,normal_price,max_price } = data;
    const document = {id,seat_class,min_price,normal_price,max_price};
    // Add any additional fields or transformations you may need for the document

    documents.push(document);
  })
  .on('end', async () => {
    // Establish connection to MongoDB Atlas
    const client = new MongoClient(uri);

    try {
      await client.connect();

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Insert all documents at once using insertMany
      const result = await collection.insertMany(documents);
      console.log(`${result.insertedCount} documents inserted.`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      client.close();
    }
  });
