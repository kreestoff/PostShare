const Sequelize = require('sequelize')
const {INTEGER} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const CommentSave = sequelize.define('comment_save', {

})

module.exports = CommentSave

sequelize.sync()