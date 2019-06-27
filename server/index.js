const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
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

process.env.SECRET_KEY = '!reddit'

app.use(cors())
app.use(bodyParser())

app.post('/signup', (req, res) => {
  let userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    userData.password = hash
    User.create(userData)
    .then(user => {
      res.json({status: user.username + ' registered'})
    })
    .catch(err => {
      res.send('error: ' + err.errors[0].message)
    })
  })
})

app.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if(user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY)
        res.json({
          user: user.username,
          token: token
        })
      } else {
        res.status(400).json({error: 'Password doesn\'t match.'})
      }
    } else {
      res.status(400).json({error: 'User doesn\'t exist.'})
    }
  })
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