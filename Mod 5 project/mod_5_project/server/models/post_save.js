const Sequelize = require('sequelize')
const {INTEGER} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const PostSave = sequelize.define('post_save', {
    user_id: {
        type: INTEGER
    },
    post_id: {
        type: INTEGER
    }
})

module.exports = PostSave

sequelize.sync()