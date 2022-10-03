const { Questions } = require('../objects/dbObjects');
const { createWriteStream } = require('fs');
const logger = createWriteStream('./src/logs/questions.txt', { flags: 'a' });
const dayjs = require('dayjs');

module.exports = (collection) => {
  Reflect.defineProperty(collection, 'add', {
    value: async (question, answer, buttons, choices, min, max) => {
      const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
      const newQuestion = await Questions.create({
        question: question,
        answer: answer,
        buttons: buttons,
        choices: choices,
        min: parseInt(min, 10),
        max: parseInt(max, 10),
      });

      logger.write(`[${dateFormat}] Created a new question`);
      collection.set(newQuestion.id, newQuestion);

      return newQuestion;
    },
  });

  Reflect.defineProperty(collection, 'remove', {
    value: async (id) => {
      const dateFormat = dayjs().format('YYYY-MM-DD hh:mm:ss');
      const question = collection.get(id) || await Questions.findOne({ where: { id: id } });
      if (!question) return new Error('This question doesn\'t exist!');

      await Questions.destroy({ where: { id: id } });

      logger.write(`[${dateFormat}] Removed a question`);
      collection.delete(id);

      return question;
    },
  });

  Reflect.defineProperty(collection, 'filterRandom', {
    value: async (category) => {
      const array = [];
      const filtered = collection.filter(q => q.category === category);
      filtered.forEach(key => array.push(key));
      const r = Math.floor(Math.random() * array.length);
      const question = array[r];
      if (!question) return new Error('This question doesn\'t exist!');

      return question;
    },
  });

  Reflect.defineProperty(collection, 'random', {
    value: async () => {
      const array = [];
      collection.forEach(key => array.push(key));
      const r = Math.floor(Math.random() * array.length);
      const question = array[r];
      if (!question) return new Error('This question doesn\'t exist!');

      return question;
    },
  });

  Reflect.defineProperty(collection, 'syncAll', {
    value: async () => {
      const questions = await Questions.findAll();
      questions.forEach(key => collection.set(key.id, key));
      console.log(`Synced ${collection.size} questions to local cache`);
    },
  });
};