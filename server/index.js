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

//create a new USER
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

//USER login
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

//delete existing USER
app.delete('/user/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(user => {
      res.json({status: 'User has been deleted'})
    })
    
})

//create a new CATEGORY
app.post('/category', (req, res) => {
  let categoryData = {
    name: req.body.name,
    description: req.body.description
  }
  Category.create(categoryData)
  .then(category => {
    res.json({status: category.name + ' created'})
  })
  .catch(err => {
    res.send('error: ' + err.errors[0].message)
  })
})

//get all CATEGORIES
app.get('/category', (req, res) => {
  Category.findAll()
  .then(categories => {
    res.json(categories)
  })
})

//update just the description of a CATEGORY
app.patch('/category', (req, res) => {
  Category.findOne({
    where: {
      name: req.body.name
    }
  })
  .then(category => {
    category.description = req.body.description
    category.save()
    res.json({status: 'You\'ve successfully updated the description'})
  })
})

//create a POST
app.post('/post', (req, res) => {
  let postData = {
    user_id: req.body.user_id,
    video: req.body.video || null,
    image: req.body.image || null,
    title: req.body.title,
    description: req.body.description || null,
    category: req.body.category
  }
  Post.create(postData) 
  .then(post => {
    res.json({status: 'post created'})
  })
  .catch(err => {res.send(err)})
})

//edit a POST's description
app.patch('/post', (req, res) => {
  Post.findOne({
    where: {
      id: req.body.post_id
    }
  })
  .then(post => {
    post.description = req.body.description
    post.save()
    res.json({status: 'You\'ve successfully updated the description'})
  })
})

//delete a POST
app.delete('/post', (req, res) => {
  Post.destroy({
    where: {
      id: req.body.post_id
    }
  })
  .then(res.json({status: 'Post has been deleted'}))
})