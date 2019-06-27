const Sequelize = require('sequelize')
const {INTEGER} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const FollowUser = sequelize.define('follow_user', {
    user_id: {
        type: INTEGER
    },
    followed_user_id: {
        type: INTEGER
    }
})

module.exports = FollowUser

sequelize.sync()