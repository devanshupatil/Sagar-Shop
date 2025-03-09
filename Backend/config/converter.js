const fs = require('fs');
const csv = require('csv-parser');
const supabase = require('./database')



function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
}

// Insert data into Supabase table
async function insertDataIntoSupabase(tableName, data) {

    const { error } = await supabase.from(tableName).insert(data);
    
    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Data successfully inserted!');
    }
}

// Main function
async function main() {
    try {
        const filePath = '../file.csv'; // Path to your CSV file
        const tableName = 'products'; // Name of your Supabase table

        // Parse CSV
        const parsedData = await parseCSV(filePath);

        // Insert into Supabase
        await insertDataIntoSupabase(tableName, parsedData);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();


// delete products 
// is deleted = false