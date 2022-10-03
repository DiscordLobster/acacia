module.exports = (sequelize, DataTypes) => {
    return sequelize.define('acacia_settings', {
        guild_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        xp_min: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        xp_max: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        money_min: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        money_max: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        lvl_up_msg: {
            type: DataTypes.TEXT,
            defaultValue: 'Congratulations! You\'ve leveled up to level %l! Keep on chatting to earn more experience!',
            allowNull: false,
        },
        welcome_msg: {
            type: DataTypes.TEXT,
            defaultValue: 'Welcome to %g, %u! We\'re happy to have you aboard! Please take the time to read our rules and check out our pavilion for more information!',
            allowNull: false,
        },
        welcome_channels: DataTypes.TEXT,
        ignored_channels: DataTypes.TEXT,
    });
};