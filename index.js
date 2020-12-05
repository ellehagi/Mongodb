// imports
const express = require('express')
const { MongoClient, ObjectId }  = require('mongodb')

// initialise express app
const app = express()

// interact with json data
app.use(express.json())

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri);

const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to Local Database");
  } catch (err) {
    console.log("an error occurred :(")
    console.error(err);
  }
}

connect()

app.get('/films', async (req, res) => {

    const allFilms = await client.db('movie').collection('films').find({}).toArray()
  
    res.json({
      message: 'Here are all your films!',
      films: allFilms
    })
  })

app.get('/film/actor', async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const film = await films.find({ title: { $regex: keyword, $options: 'i' } }) 
        res.status(200).json({
            status: true,
            res: film
        })
    } catch (err) {
        res.status(400).json({
            status: true,
            error: err.message
        })
       
    }

});

app.post('/watch', async (req, res) => {
  try {
    const addFilm = new Watch({
      _id: "0eafaadje5fad",
      title: "The Wizard of Oz",
    });
    Watch.create(addFilm, function () {
      console.log(addFilm);
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



app.listen(4000, () => {
    console.log('Server is running')
  })
  