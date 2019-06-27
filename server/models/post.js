const Sequelize = require('sequelize')
const {STRING, INTEGER, TEXT} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);

const Post = sequelize.define('post', {
    user_id: {
        type: INTEGER,
        allowNull: false
    },
    video: {
        type: STRING,     
        allowNull: true
    },
    image: {
        type: STRING,
        allowNull: true
    },
    title: {
        type: STRING,
        allowNull: false
    },
    description: {
        type: TEXT,
        allowNull: true
    },
    category: {
        type: INTEGER,
        allowNull: false
    }
})

module.exports = Post

sequelize.sync()