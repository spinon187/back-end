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
    const x = db.select("items.id", 'items.name', 'categories.cat_name AS category').from('items').join('categories', function(){
        this.on('items.category', '=', 'categories.id')});
    return x;
}

function getListItemByID(id) {
    return db('items').where({ id: Number(id) }).first();
}

function getTopNine(id){
    return db('favorites').where({ user: Number(id) })
}

function getFavById(id){
    return db('favorites').where({ id: Number(id) }).first();
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