module.exports = (sequelize, DataTypes) => {
    return sequelize.define('level_role', {
        level: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        guildId: DataTypes.STRING,
        role_id: {
            type: DataTypes.STRING,
            unique: true,
        },
    });
};