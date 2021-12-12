const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize, Forum, Recipe, Workout, User } = require('../database');
const port = 3001;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  Forum.findAll({
    include: User // [Recipe, Workout, User] if you want full data
  })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => { console.log(err)})
})

app.post('/', (req, res) => {
  console.log('request body:', req.body)
  Forum.create(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => { console.log(err)})
})

app.put('/like/:id', (req, res) => {
  Forum.increment({ "likes": 1}, {where: {id: req.params.id}})
  .then( res.send(`Succesfully incremented likes for post id: ${req.params.id}`))
  .catch( err => { console.log(err)} )
})

app.put('/dislike/:id', (req, res) => {
  Forum.increment({ "likes": -1}, {where: {id: req.params.id}})
  .then( res.send(`Succesfully incremented likes for post id: ${req.params.id}`))
  .catch( err => { console.log(err)} )
})


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});