
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'garry33', password: 'garry'},
        {id: 2, username: 'rowValue2', password: 'default'},
        {id: 3, username: 'xXmidnight_wulfXx', password: '2edgy'},
        {id: 4, username: 'Uncle Jimmy', password: 'godfather'},
        {id: 5, username: 'kawaiisenpai', password: 'uguu'},
        {id: 6, username: 'coolguy7', password: 'loldude'},
        {id: 7, username: 'LeonThotsky', password: 'groan'}
      ]);
    });
};
