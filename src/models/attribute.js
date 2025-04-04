const Sequelize = require('sequelize');
const db = require('../config/db_config');
const Category = require('./category')

// https://medium.com/@the_ozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5
// https://medium.com/@tavilesa12/dealing-with-many-to-many-associations-in-sequelize-bddc34201b80

const Attribute = db.define('attribute', {
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dataType: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Attribute;