require('dotenv').config();

const express = require('express');
const users = require('../../data/userFunctions.js');
const db = require('../../data/listFunctions.js');
const restricted = require('../middleware/restricted.js');
const userRestricted = require('../middleware/userRestricted.js');

const listRouter = express.Router({mergeParams: true});

listRouter.get('/topnine/', userRestricted, (req, res) => {
    const id = req.params.ownerID;

    db.getListAll(id)
        .then(topNine => {
            res.status(200).json(topNine);
        })
        .catch(err => res.status(500).json(err));
});

listRouter.get('/topnine/:id/', userRestricted, (req, res) => {
    const id = req.params.id;
    const ownerID = Number(req.params.ownerID);

    db.getListItemByID(id)
        .then(item => {
                res.status(200).json(item);
        })
        .catch(err => res.status(500).send(err));
});

listRouter.post('/topnine/', userRestricted, (req, res) => {
    const data = {name: req.body.name, ownerID: req.params.ownerID};
    console.log(data);
    db.insertItem(data)
        .then(added => {
            res.status(201).json(added)
        })
        .catch(err => res.status(500).send(err));
})

listRouter.put('/topnine/:id/', userRestricted, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    db.updateItem(id, data)
        .then(updated => {
            res.status(201).json(updated);
        })
        .catch(err => res.status(500).send(err));
})

listRouter.delete('/topnine/:id/', userRestricted, (req, res) => {
    const id = req.params.id;
    db.removeItem(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(err => res.status(500).send(err));
})

module.exports = listRouter;