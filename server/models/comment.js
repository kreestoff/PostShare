const Sequelize = require('sequelize')
const {INTEGER, TEXT} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const Comment = sequelize.define('comment', {
    post_id: {
        type: INTEGER,
        allowNull: false,
        foreignKey: true
    },
    comment_id: {
        type: INTEGER,
        allowNull: true,
        foreignKey: true
    },
    user_id: {
        type: INTEGER,
        allowNull: false,
        foreignKey: true
    },
    content: {
        type: TEXT,
        allowNull: true
    }
})





module.exports = Comment

sequelize.sync()