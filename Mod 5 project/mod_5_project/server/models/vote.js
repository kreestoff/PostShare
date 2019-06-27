const Sequelize = require('sequelize')
const {INTEGER} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const Vote = sequelize.define('vote', {
    post_id: {
        type: INTEGER,
    },
    comment_id: {
        type: INTEGER
    },
    user_id: {
        type: INTEGER
    },
    vote: {
        type: INTEGER
    }
})

module.exports = Vote

sequelize.sync()