const db = require('./dbConfig.js');

module.exports = {
    getItemListAll,
    getListItemByID,
    getTopNine,
    getFavById,
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

function getTopNine(user_id){
    return db('favorites').where({ user_id: Number(user_id) })
}

function getFavById(id){
    return db('favorites').where({ id: Number(id) }).first();
}
  
function insertItem(item) {
    return db('items')
      .insert(item)
      .then(ids => ({ id: ids[0] }));
}

function insertFav(user, item) {
    return db('favorites')
        .insert({
            user_id: user.id,
            name: item.name,
            position: item.position
        })
        .then(ids => {({ id: ids[0] })});
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

function updateFav(id, user, item, position) {
    const updated = {
        user_id: user.id,
        name: item.name,
        position: position
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