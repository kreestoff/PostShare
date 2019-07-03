const Sequelize = require('sequelize')
const {STRING, TEXT} = Sequelize


const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const Category = sequelize.define('category', {
    name: {
        type: STRING,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 16]
        }
    },
    description: {
        type: TEXT,
        validate: {
            notEmpty: true,
            len: [20, 200]
        }
    }
})



module.exports = Category

sequelize.sync()