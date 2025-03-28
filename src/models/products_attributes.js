const Sequelize = require('sequelize');
const db = require('../config/db_config');

// https://medium.com/@the_ozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5
// https://medium.com/@tavilesa12/dealing-with-many-to-many-associations-in-sequelize-bddc34201b80

const ProductAttributes = db.define('products_attributes', {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    attributeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'attributes',
            key: 'id'
        }
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = ProductAttributes;