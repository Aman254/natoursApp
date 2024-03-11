const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Db connection Sucessfull'))
  .catch(err => console.error('DataBase connection error', err));

//Read Json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//Import Data into Databse
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Sucesfully Loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Dalete All data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleated Sucessfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
