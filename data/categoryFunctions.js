const db = require('./dbConfig.js');

module.exports = {
    getCategories,
    getItemsFromCategory,
    insertItemToCategory
};
  
 
function getCategories() {
    return db('categories');
}

function getItemsFromCategory(category_id){
    return db('items').where({ category_id: Number(category_id) });
}

function insertItemToCategory(item) {
    return db('items')
        .insert({
            name: item.name,
            category_id: item.category_id
        })
        .then(ids => {({ id: ids[0] }) });
}

