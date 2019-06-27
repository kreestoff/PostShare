const express = require('express')
const app = express()
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
const User = require('./models/user')
const Category = require('./models/category')
const Comment = require('./models/comment')
const FollowCategory = require('./models/follow_category')
const FollowUser = require('./models/follow_user')
const PostSave = require('./models/post_save')
const Post = require('./models/post')
const Vote = require('./models/vote')

app.listen(3000, () => {
    console.log("server is up and listening on 3000...")
})

app.use(cors())
app.use(bodyParser())

app.get('/', (req, res) => {
    console.log("Responding to root route")
    res.send("hello from index.js")
})

app.get('/users', (req, res) => {
    User.findAll()
    .then(user => res.json(user))
})

app.post('/users', (req, res) => {
    if(req.body.username !== "" && req.body.password !== "" && req.body.email !== "")
    {let userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {username: req.body.username} || {email: req.body.email}
    })
    .then(user => {
      if(!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
          .then(user => {
            res.json({status: user.username + ' registered'})
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        })
      } else {
        res.json({error: "User already exists."})
      }
    })}else{res.json({error: "Please enter valid Username Email and Password"})}
})

app.delete('/users/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(user => {
        delete (user)
    })
    res.json({status: req.body.username + ' deleted'})
})