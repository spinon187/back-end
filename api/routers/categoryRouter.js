require('dotenv').config();

const express = require('express');
const db = require('../../data/categoryFunctions.js');
const restricted = require('../middleware/restricted.js');
const userRestricted = require('../middleware/userRestricted.js');

const categoryRouter = express.Router();

//Return all Categories
categoryRouter.get('/categories/', (req, res) => {
    const id = Number(req.params.user_id);
    console.log(id);
    db.getCategories()
    .then(categories => {
        res.status(200).json(categories)
    })
    .catch(err => res.status(500).json(err))
});

// Return all Items associated with Category
categoryRouter.get('/categories/:category_id/items', (req, res) => {
    const id = Number(req.params.category_id);
    console.log(id);
    db.getItemsFromCategory(id)
    .then(items => {
        res.status(200).json(items)
    })
    .catch(err => res.status(500).json(err))    
})

//Add Item to specific category
categoryRouter.post('/categories/:category_id/items', (req, res) => {
    const id = Number(req.params.category_id);
    const item = { name: req.body.name, category_id: id}
    console.log(id);
    db.insertItemToCategory(item)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => res.status(500).json(err))    
})

// listRouter.get('/all/', userRestricted, (req, res) => {
//     const id = Number(req.params.user_id);
//     console.log(id);
//     db.getItemListAll()
//         .then(list => {
//             res.status(200).json(list);
//         })
//         .catch(err => res.status(500).json(err));
// })

// listRouter.get('/:id/', userRestricted, (req, res) => {
//     const id = req.params.id;

//     db.getListItemByID(id)
//         .then(item => {
//                 res.status(200).json(item);
//         })
//         .catch(err => res.status(500).send(err));
// });

// listRouter.post('/topnine/', restricted, (req, res) => {
//     const user = Number(req.params.user_id); 
//     const item = {
//         id: req.body.id,
//         category: req.body.category,
//         position: req.body.position
//     };
//     console.log(user);
//     console.log(item);
//     db.insertFav(user, item)
//         .then(updated => {
//             console.log(updated);
//             res.status(201).json(updated);
//         })
//         .catch(err => res.status(500).send(err));
// })

// listRouter.put('/update/:id/', userRestricted, (req, res) => {
//     const id = req.params.id;
//     const data = req.body;
//     db.updateItem(id, data)
//         .then(updated => {
//             res.status(201).json(updated);
//         })
//         .catch(err => res.status(500).send(err));
// })

// listRouter.put('/topnine/:id/', userRestricted, (req, res) => {
//     const id = req.params.id;
//     const user = Number(req.params.user_id); 
//     const item = {
//         user: user,
//         item: req.body.id,
//         category: req.body.category,
//         position: req.body.position
//     };
//     db.updateFav(id, user, item)
//         .then(updated => {
//             res.status(201).json(updated);
//         })
//         .catch(err => res.status(500).send(err));
// })

// listRouter.post('/add/', userRestricted, (req, res) => {
//     const data = {
//         name: req.body.name,
//         category: req.body.category,

//     };
//     console.log(data);
//     db.insertItem(data)
//         .then(added => {
//             res.status(201).json(added)
//         })
//         .catch(err => res.status(500).send(err));
// })

// listRouter.delete('/delete/:id/', userRestricted, (req, res) => {
//     const id = req.params.id;
//     db.removeItem(id)
//         .then(deleted => {
//             res.status(200).json(deleted);
//         })
//         .catch(err => res.status(500).send(err));
// })

// listRouter.delete('/topnine/:id', userRestricted, (req, res) => {
//     const id = req.params.id;
//     db.removeFav(id)
//         .then(deleted => {
//             res.status(200).json(deleted);
//         })
//         .catch(err => res.status(500).send(err));
// })

module.exports = categoryRouter;