const mongoose = require('mongoose')
const config = require('config')
const db = "mongodb+srv://ansathyabarani:guTuLW8SLJ31ORUm@cluster0.xxsv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB

// Promises
/*
mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
      console.error(err.message)
      process.exit(1)
    })
*/
