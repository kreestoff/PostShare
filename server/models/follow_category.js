const Sequelize = require('sequelize')
const {STRING, INTEGER, TEXT} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const FollowCategory = sequelize.define('follow_category', {
 
})

module.exports = FollowCategory

sequelize.sync()