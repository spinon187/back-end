const db = require('./dbConfig.js');

module.exports = {
    getListAll,
    getListItemByID,
    insertItem,
    updateItem,
    removeItem,
};
  
 
function getListAll(owner) {
    return db('topNine').where({ ownerID: Number(owner) });
}

function getListItemByID(id) {
    return db('topNine').where({ id: Number(id) }).first();
}
  
function insertItem(item) {
    return db('topNine')
      .insert(item)
      .then(ids => ({ id: ids[0] }));
}
  
function updateItem(id, item) {
    return db('topNine')
      .where({ id: Number(id) })
      .update(item);
}
  
function removeItem(id) {
    return db('topNine')
      .where({ id: Number(id) })
      .del();
}