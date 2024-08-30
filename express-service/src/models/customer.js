const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Customer = sequelize.define('Customer', {
    no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'customer',
    timestamps: false
});

module.exports = Customer;
