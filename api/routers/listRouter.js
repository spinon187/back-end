require('dotenv').config();

const express = require('express');
const users = require('../../data/userFunctions.js');
const db = require('../../data/listFunctions.js');
const restricted = require('../middleware/restricted.js');
const userRestricted = require('../middleware/userRestricted.js');

const listRouter = express.Router({mergeParams: true});

listRouter.get('/topnine/', userRestricted, (req, res) => {
    const id = Number(req.params.user_id);
    console.log(id);
    db.getTopNine(id)
        .then(topNine => {
            res.status(200).json(topNine);
        })
        .catch(err => res.status(500).json(err));
});

listRouter.get('/all/', userRestricted, (req, res) => {
    const id = Number(req.params.user_id);
    console.log(id);
    db.getItemListAll()
        .then(list => {
            res.status(200).json(list);
        })
        .catch(err => res.status(500).json(err));
})

listRouter.get('/:id/', userRestricted, (req, res) => {
    const id = req.params.id;

    db.getListItemByID(id)
        .then(item => {
                res.status(200).json(item);
        })
        .catch(err => res.status(500).send(err));
});

listRouter.post('/topnine/', restricted, (req, res) => {
    const user = Number(req.params.user_id);
    let cat = null;
    if(req.body.category === "Movies"){
        cat = 1
    }
    else if(req.body.category === 'Video Games'){
        cat = 2
    }
    else if(req.body.category === 'Music'){
        cat = 3
    }

    const item = {
        id: req.body.id,
        category: cat,
        position: req.body.position
    };
    console.log(user);
    console.log(item);
    db.insertFav(user, item)
        .then(updated => {
            console.log(updated);
            res.status(201).json(updated);
        })
        .catch(err => res.status(500).send(err));
})

listRouter.put('/update/:id/', userRestricted, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    db.updateItem(id, data)
        .then(updated => {
            res.status(201).json(updated);
        })
        .catch(err => res.status(500).send(err));
})

listRouter.put('/topnine/:id/', userRestricted, (req, res) => {
    const id = req.params.id;
    const user = Number(req.params.user_id); 
    const item = {
        user: user,
        item: req.body.id,
        category: req.body.category,
        position: req.body.position
    };
    db.updateFav(id, user, item)
        .then(updated => {
            res.status(201).json(updated);
        })
        .catch(err => res.status(500).send(err));
})

listRouter.post('/add/', userRestricted, (req, res) => {
    const data = {
        name: req.body.name,
        category: req.body.category,

    };
    console.log(data);
    db.insertItem(data)
        .then(added => {
            res.status(201).json(added)
        })
        .catch(err => res.status(500).send(err));
})

listRouter.delete('/delete/:id/', userRestricted, (req, res) => {
    const id = req.params.id;
    db.removeItem(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(err => res.status(500).send(err));
})

listRouter.delete('/topnine/:id', userRestricted, (req, res) => {
    const id = req.params.id;
    db.removeFav(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(err => res.status(500).send(err));
})

module.exports = listRouter;