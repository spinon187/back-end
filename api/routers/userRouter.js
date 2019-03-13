require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../data/userFunctions.js');
const restricted = require('../middleware/restricted.js');
const listRouter = require('./listRouter.js');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();
userRouter.use(`/users/:user_id`, listRouter);

const secret = process.env.TOKEN_SECRET || 'idk lol';

function generateToken(user){
    const payload = {
        id: user.id,
        username: user.username,
        password: user.password,
    };

    const options = {
        expiresIn: '24h'
    }

    return jwt.sign(payload, secret, options)
}

userRouter.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  
    db.insertUser(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

userRouter.post('/login', (req, res) => {
    let {username, password} = req.body;
    db.getUserByName(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token,
                    secret,
                });
            }
            else {
                res.status(401).json({message: 'Incorrect username or password.'});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

userRouter.get('/users', restricted, (req, res) => {
    db.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).send(err));
});

userRouter.get('/users/:id', restricted, (req, res) => {
    const id = req.params.id;

    db.getUserByID(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => res.status(500).send(err));
});

userRouter.post('/users/', restricted, (req, res) => {
    const data = req.body;
    db.insertUser(data)
        .then(added => {
            res.status(201).json(added)
        })
        .catch(err => res.status(500).send(err));
})

userRouter.put('/users/:id', restricted, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    db.updateUser(id, data)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(err => res.status(500).send(err));
})

userRouter.delete('/users/:id', restricted, (req, res) => {
    const id = req.params.id;
    db.removeUser(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(err => res.status(500).send(err));
})

module.exports = userRouter;