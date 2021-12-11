const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize, Forum, Recipe } = require('../database');
const port = 3001;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  Forum.findAll({ include: Recipe })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => { console.log(err)})
})

app.post('/', (req, res) => {
  console.log('request body:', req.body)
  Forum.create(req.body)
    .then(post => {
      console.log('post:', post)
      res.status(201).json(post);
    })
    .catch(err => { console.log(err)})
})



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});