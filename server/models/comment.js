const Sequelize = require('sequelize')
const {INTEGER, TEXT} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const Comment = sequelize.define('comment', {
    content: {
        type: TEXT,
        validate: {
            notEmpty: true
        }
    }
})





module.exports = Comment

sequelize.sync()