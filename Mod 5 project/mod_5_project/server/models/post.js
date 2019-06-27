const Sequelize = require('sequelize')
const {STRING, INTEGER, TEXT} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const Post = sequelize.define('post', {
    user_id: {
        type: INTEGER
    },
    video: {
        type: STRING
    },
    image: {
        type: STRING
    },
    title: {
        type: STRING
    },
    description: {
        type: TEXT
    },
    category: {
        type: INTEGER
    }
})

module.exports = Post

sequelize.sync()