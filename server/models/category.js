const Sequelize = require('sequelize')
const {STRING, TEXT} = Sequelize

const sequelize = new Sequelize(`postgres://postgres:learnlovecode@127.0.0.1:5432/mod_5_project`);


const Category = sequelize.define('category', {
    name: {
        type: STRING
    },
    description: {
        type: TEXT
    }
})

module.exports = Category

sequelize.sync()