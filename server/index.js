const express = require('express')
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
const CommentSave = require('./models/comment_save')
const app = express()

app.listen(3000, () => {
    console.log("server is up and listening on 3000...")
})

process.env.SECRET_KEY = '!reddit'

app.use(cors())
app.use(bodyParser())

const Sequelize = require('sequelize')
const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);

//Associations
Category.hasMany(Post)
Category.belongsToMany(User, {through: {model: FollowCategory}})
User.hasMany(Post)
User.belongsToMany(User, {as: 'follower', foreignKey: 'followedId', through: FollowUser})
Post.belongsTo(Category)
Post.belongsTo(User)
Post.belongsToMany(User, {through: {model: PostSave}})
Post.hasMany(Comment)
Post.hasMany(Vote)
Comment.belongsToMany(User, {through: {model: CommentSave}})
Comment.belongsTo(Post)
Comment.belongsTo(User)
Comment.belongsTo(Comment)
Comment.hasMany(Vote)
Vote.belongsTo(User)
Vote.belongsTo(Post)
Vote.belongsTo(Comment)







sequelize.sync()


//create helper function to get TOKEN 
function getUsername(req, res, callback) {
  if(req.headers.authorization && (req.headers.authorization.split(' ').length > 1)) {
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, results) => {
      if(err) {
        console.log(err)
      } else {
        if(results && results.username) {
          callback(results.username)
        } else {
          console.log('no user')
        }
      }
    })
  }
}

function authorizeUser(req, res, username, callback) {
  if(req.headers.Authorization && (req.headers.Authorization.split(' ').length > 1)) {
    let token = req.headers.Authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, results) => {
      if(err) {
        //handle error
      } else {
        if(username === results.username) {
          callback()
        } else {
          //handle error
        }
      }
    })
  }
}



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
      res.json({error: err.errors[0].message})
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
        // res.cookie('jwt', token)
        res.json({
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

//get all USERs
app.get('/user', (req, res) => {
  User.findAll()
  .then(users => {
    res.json(users)
  })
})

//get logged in USER and their POSTS, COMMENTS and saved things
app.get('/user/current', (req, res) => {
  getUsername(req, res, (username) => {
    User.findAll({
      where: {
        username: username
      }
    })
    .then(users => {
      let user = users[0]
      let userPosts
      user.getPosts()
      .then(posts => {
      userPosts = posts
      res.json({userPosts, user})
      })
    })
  })
})

// app.get('/user/current', (req, res) => {
//   getUsername(req, res, (username) => {
//     User.findAll({
//       where: {
//         username: username
//       }
//     })
//     .then(async (users) => {
//       let user = users[0]
//       let postVotes = []
//       let commentVotes = []
//       await user.getPosts()
//       .then(posts => {
//       userPosts = posts
//       return userPosts
//       })
//       userPosts.forEach(post => {
//         await post.getVotes()
//         .then(votes => {
//           postVotes.push(votes)
//         })
//       })
//       await user.getComments()
//       .then(comments => {
//         userComments = comments
//         return userComments
//       })
//       userComments.forEach(comment => {
//         await comment.getVotes()
//         .then(votes => {
//           commentVotes.push(votes)
//         })
//       })
//       return res.json({user, userPosts, postVotes, commentVotes})
//     })
//   })
// })

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
//get one CATEGORY
app.get('/category/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(category => {
    res.json(category)
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
  getUsername(req, res, (username) => {
    User.findAll({
      where: {
        username: username
      }
    })
    .then(users => {
      if(users.length > 0) {
        let user = users[0]
        let category = req.body.category
        let postData = {
          userId: user.dataValues.id,
          categoryId: category,
          video: req.body.video || null,
          image: req.body.image || null,
          title: req.body.title,
          description: req.body.description || null
        }
        Post.create(postData)
        .then(post => {
          res.json({status: 'post created'})
        })
        .catch(err => {res.send(err)})
      } else {
        res.json({status: 'user not found'})
      }
    })
    .catch(err => {
      console.log(err)
    })
  })
})

//get all POSTS
app.get('/post', (req, res) => {
  Post.findAll()
  .then(posts => {
    res.json(posts)
  })
})

//get a single POST with ability to comment
app.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
  .then( async (post) => {
    let currentPost = post
    let postUser
    let postCategory
    let postComments
    let voteTotal = 0
    await currentPost.getUser()
    .then(user =>{
      postUser = user
      return postUser
    })
    await currentPost.getVotes()
    .then(votes => {
      votes.forEach(vote => {
        voteTotal += vote.vote
      })
      return voteTotal
    })
    await currentPost.getCategory()
    .then(category => {
      postCategory = category
      return postCategory
    })
    currentPost.getComments()
    .then(comments => {
      postComments = comments
      res.json({currentPost, postUser, postCategory, postComments, voteTotal})
    })
  })
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

//post a COMMENT
app.post('/comment', (req, res) => {
  getUsername(req, res, (username) => {
    User.findAll({
      where: {
        username: username
      }
    })
    .then(users => {
      let user = users[0]
      let postId = req.body.postId
      let commentId = req.body.commentId || null
      let userId = user.id
      let content = req.body.content
      let commentData = {postId, commentId, userId, content}
      console.log(req.body)
      Comment.create(commentData)
      .then(comment => {
        res.json({status: 'comment created'})
      })
      .catch(err => {res.send(err.errors[0].message)})
     
    })
  })
})

//get user and votes for COMMENT
app.get('/comment/:id/user', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    }
  })
  .then( async (comment) => {
    let currentComment = comment
    let commentUser
    let voteTotal = 0
    await currentComment.getUser()
    .then(user => {
      commentUser = user
      return commentUser
    })
    await currentComment.getVotes()
    .then(votes => {
      votes.forEach(vote => {
        voteTotal += vote.vote
      })
      res.json({commentUser, voteTotal})
    })
  })
})

//get child COMMENT of COMMENT


//update the content of a COMMENT
app.patch('/comment', (req, res) => {
  Comment.findOne({
    where: {
      id: req.body.comment_id
    }
  })
  .then(comment => {
    comment.content = req.body.content
    if(comment.content != ""){
      comment.save()
    }else{
      res.json({status: "can't be an empty string"})
    }
    res.json({status: `${comment.content}`})
  })
})
//when deleting a comment I don't want any of the responses to be
//affected so when a client 'deletes' their comment it will set the
//user id to one that is designated so that the username will display
//as deleted and the content will be "deleted" and the comment can
//no longer be voted on

//post a FOLLOW_CATEGORY
//will manage on front end so that followed categories will not have
//the option to be followed
app.post('/follow_category', (req, res) => {
  let followData = {
    userId: req.body.user_id,
    categoryId: req.body.category_id
  }
  FollowCategory.create(followData)
  .then(res.json({status: 'you\'re now following this category'}))
})

//delete a FOLLOW_CATEGORY
app.delete('/follow_category', (req, res) => {
  FollowCategory.destroy({
    where: {
      id: req.body.follow_category_id
    }
  })
  .then(res.json({status: 'no longer following'}))
})

//post FOLLOW_USER
//will manage on front end so that followed users will not have
//the option to be followed
app.post('/follow_user', (req, res) => {
  let followData = {
    followerId: req.body.user_id,
    followedId: req.body.followed_user_id
  }
  FollowUser.create(followData)
  .then(res.json({status: 'you\'re now following this user'}))
})

//delete a FOLLOW_USER
app.delete('/follow_user', (req, res) => {
  FollowUser.destroy({
    where: {
      id: req.body.follow_user_id
    }
  })
  .then(res.json({status: 'no longer following'}))
})

//post UPVOTE to post
app.post('/post/:postId/upvote', (req, res) => {
  getUsername(req, res, (username) => {
    User.findAll({
      where: {
        username: username
      }
    })
    .then(users => {
      let user = users[0]
      let voteData = {
        postId: req.params.postId,
        userId: user.id,
        vote: 1
      }
      Vote.findAll({where: {postId: voteData.postId}})
      .then(votes => {
        if(votes.filter(vote => vote.userId === voteData.userId).length > 0) {
          let castVote = votes.filter(vote => vote.userId === voteData.userId)[0]
          if(parseInt(castVote.vote) === 1) {
            res.json({status: 'already upvoted'})
          } else {
            castVote.update({vote: 1})
            return res.json({status: 'downvote to upvote'})
        }
        } else {
          Vote.create(voteData)
          .then(res.json({status: 'upvoted'}))
        }
      })
    })
  })
})

//post DOWNVOTE to post
app.post('/post/:postId/downvote', (req, res) => {
  getUsername(req, res, (username) => {
    User.findAll({
      where: {
        username: username
      }
    })
    .then(users => {
      let user = users[0]
      let voteData = {
        postId: req.params.postId,
        userId: user.id,
        vote: -1
      }
      Vote.findAll({where: {postId: voteData.postId}})
      .then(votes => {
        if(votes.filter(vote => vote.userId === voteData.userId).length > 0) {
          let castVote = votes.filter(vote => vote.userId === voteData.userId)[0]
          if(parseInt(castVote.vote) === -1) {
            res.json({status: 'already downvoted'})
          } else {
            castVote.update({vote: -1})
            return res.json({status: 'upvote to downvote'})
          }
        } else {
          Vote.create(voteData)
          .then(res.json({status: 'downvoted'}))
        }
      })
    })
  })
})

//post UPVOTE to comment
app.post('/comment/:commentId/upvote', (req, res) => {
  getUsername(req, res, (username) => {
    User.findAll({
      where: {
        username: username
      }
    })
    .then(users => {
      let user = users[0]
      let voteData = {
        commentId: req.params.commentId,
        userId: user.id,
        vote: 1
      }
      Vote.findAll({where: {commentId: voteData.commentId}})
      .then(votes => {
        if(votes.filter(vote => vote.userId === voteData.userId).length > 0) {
          let castVote = votes.filter(vote => vote.userId === voteData.userId)[0]
          if(parseInt(castVote.vote) === 1) {
            res.json({status: 'already upvoted'})
          } else {
            castVote.update({vote: 1})
            return res.json({status: 'downvote to upvote'})
        }
        } else {
          Vote.create(voteData)
          .then(res.json({status: 'upvoted'}))
        }
      })
    })
  })
})


//post DOWNVOTE to comment
app.post('/comment/:commentId/downvote', (req, res) => {
  getUsername(req, res, (username) => {
    User.findAll({
      where: {
        username: username
      }
    })
    .then(users => {
      let user = users[0]
      let voteData = {
        commentId: req.params.commentId,
        userId: user.id,
        vote: 1
      }
      Vote.findAll({where: {commentId: voteData.commentId}})
      .then(votes => {
        if(votes.filter(vote => vote.userId === voteData.userId).length > 0) {
          let castVote = votes.filter(vote => vote.userId === voteData.userId)[0]
          if(parseInt(castVote.vote) === -1) {
            res.json({status: 'already downvoted'})
          } else {
            castVote.update({vote: -1})
            return res.json({status: 'upvote to downvote'})
        }
        } else {
          Vote.create(voteData)
          .then(res.json({status: 'downvoted'}))
        }
      })
    })
  })
})

//patch VOTE
app.patch('/vote', (req, res) => {
  Vote.findOne({
    where: {
      id: req.body.vote_id
    }
  })
  .then(vote => {
    vote.vote = req.body.vote
    vote.save()
    res.json({status: 'vote successfully updated'})
  })
})

//delete VOTE
app.delete('/vote', (req, res) => {
  Vote.destroy({
    where: {
      id: req.body.vote_id
    }
  })
  .then(res.json({status: 'vote deleted'}))
})

//post POST_SAVE
app.post('/post_save', (req, res) => {
  let postSave = {
    userId: req.body.user_id,
    postId: req.body.post_id
  }
  PostSave.create(postSave)
  .then(res.json({status: 'post saved'}))
})

//delete POST_SAVE
app.delete('/post_save', (req, res) => {
  PostSave.destroy({
    where: {
      id: req.body.post_save_id
    }
  })
  .then(res.json({status: 'post unsaved'}))
})

//post COMMENT_SAVE
app.post('/comment_save', (req, res) => {
  let commentSave = {
    userId: req.body.user_id,
    commentId: req.body.comment_id
  }
  CommentSave.create(commentSave)
  .then(res.json({status: 'comment saved'}))
})

//delete COMMENT_SAVE
app.delete('/comment_save', (req, res) => {
  CommentSave.destroy({
    where: {
      id: req.body.comment_save_id
    }
  })
  .then(res.json({status: 'comment unsaved'}))
})

