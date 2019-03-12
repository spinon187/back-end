const bcrypt = require('bcryptjs');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'garry33', password: bcrypt.hashSync('garry', 10)},
        {id: 2, username: 'rowValue2', password: bcrypt.hashSync('default', 10)},
        {id: 3, username: 'xXmidnight_wulfXx', password: bcrypt.hashSync('2edgy', 10)},
        {id: 4, username: 'Uncle Jimmy', password: bcrypt.hashSync('godfather', 10)},
        {id: 5, username: 'kawaiisenpai', password: bcrypt.hashSync('uguu', 10)},
        {id: 6, username: 'coolguy7', password: bcrypt.hashSync('loldude', 10)},
        {id: 7, username: 'LeonThotsky', password: bcrypt.hashSync('groan', 10)}
      ]);
    });
};
