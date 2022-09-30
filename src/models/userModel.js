module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        xp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        wallet: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        bank: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        cover_url: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        cover_description: {
            type: DataTypes.TEXT,
            defaultValue: 'I\'m a new user!',
        },
    });
};