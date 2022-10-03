module.exports = (sequelize, DataTypes) => {
  return sequelize.define('quiz_question', {
    category: DataTypes.STRING,
    question: DataTypes.TEXT,
    buttons: DataTypes.INTEGER,
    choices: DataTypes.TEXT,
    answer: DataTypes.STRING,
    min: DataTypes.INTEGER,
    max: DataTypes.INTEGER,
  });
};