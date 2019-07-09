const User = require('./models/user')
const Category = require('./models/category')
const Comment = require('./models/comment')
const FollowCategory = require('./models/follow_category')
const FollowUser = require('./models/follow_user')
const PostSave = require('./models/post_save')
const Post = require('./models/post')
const Vote = require('./models/vote')
const CommentSave = require('./models/comment_save')

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