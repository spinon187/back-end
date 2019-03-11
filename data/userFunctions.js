const db = require('./dbConfig.js');

module.exports = {
    getUsers,
    getUserByID,
    getUserByName,
    insertUser,
    updateUser,
    removeUser,
};
  
function getUsers() {
    return db('users');
}
  
function getUserByID(id) {
    return db('users').where({ id: Number(id) }).first();
}

function getUserByName(name) {
    return db('users').where({ username: name }).first();
}
  
function insertUser(user) {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0], username: user.username, password: user.password }));
}
  
function updateUser(id, user) {
    return db('users')
      .where({ id: Number(id) })
      .update(user);
}
  
function removeUser(id) {
    return db('users')
      .where({ id: Number(id) })
      .del();
}