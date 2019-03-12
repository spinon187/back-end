const db = require('./dbConfig.js');

module.exports = {
    getItemListAll,
    getListItemByID,
    getTopNine,
    insertItem,
    insertFav,
    updateItem,
    updateFav,
    removeItem,
    removeFav

};
  
 
function getItemListAll() {
    return db('items');
}

function getListItemByID(id) {
    return db('items').where({ id: Number(id) }).first();
}

function getTopNine(id){
    return db('favorites').where({ id: Number(id) })
}
  
function insertItem(item) {
    return db('items')
      .insert(item)
      .then(ids => ({ id: ids[0] }));
}

function insertFav(id, item) {
    return db('favorites')
        .insert({
            user: id,
            category: item.category,
            item: item.id,
            position: item.position
        })
        .then(ids => ({ id: ids[0] }));
}
  
function updateItem(id, item) {
    return db('items')
      .where({ id: Number(id) })
      .update(item);
}

function updateItem(id, item) {
    return db('items')
      .where({ id: Number(id) })
      .update(item);
}

function updateFav(id, user, item) {
    const updated = {
        user: user,
        category: item.category,
        item: item.id,
        position: item.position
    }
    
    return db('favorites')
      .where({ id: Number(id) })
      .update(updated);
}

function removeItem(id) {
    return db('items')
      .where({ id: Number(id) })
      .del();
}

function removeFav(id) {
    return db('favorites')
      .where({ id: Number(id) })
      .del();
}