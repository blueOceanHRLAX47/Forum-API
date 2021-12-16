const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize, Forum, Recipe, Workout, User, Comment } = require('../database');
const axios = require('axios');
const port = 3001;

app.use(cors(
  { origin: ['http://cultiveight.net', 'http://localhost:3000'] }
));
app.use(express.json());

app.get('/comment/:id', (req, res) => {
  console.log('REQ: ', req.params)
  Comment.findAll({
    include: User,
    where: {
      post_id: req.params.id
    }
  })
  .then(comment => {
    res.status(200).json(comment);
  })
  .catch(err => { console.log(err)})
})

app.get('/', (req, res) => {
  Forum.findAll({
    include: [User, Comment], // include Recipe and Workout as well if desired
    order: sequelize.col('time_posted')
  })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => { console.log(err)})
})

app.post('/comment/:id', (req, res) => {
  Comment.create({
    "user_id": req.body.user_id,
    "post_id": req.params.id,
    "content": req.body.content,
    "time_posted": req.body.time_posted
  })
  .then(comment => {
    res.status(201).json(comment);
  })
  .catch(err => { console.log(err)})
})

app.post('/', (req, res) => {
  // axios.get('http://cultiveight.net')
  // .then(result => console.log('result of GET request:', result.body))
  // .catch(err => console.log(err));

  console.log('request body:', req.body);

  Forum.create({
    user_id: 5,
    time_posted: Date.now(),
    title: req.body.title,
    content: req.body.content
  })
    .then(post => {
      res.status(201).json(req);
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