const router = require('express').Router();
const MMOrpg = require('../models/videogame');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        MMOrpg.create(req.body)
            .then(mmorpg => res.json(mmorpg))
            .catch(err => errorHandler(err,  req, res));
    })

    .put('/:id', (req, res) => {
        MMOrpg.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(mmorpg => res.json(mmorpg))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        MMOrpg.findById(id)
            .lean()
            .then(mmorpg => {
                if(!mmorpg) {
                    errorHandler({
                        status: 404,
                        error: `player id ${id} does not exist`
                    }, req, res);
                }
                else res.json(mmorpg);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        MMOrpg.find(req.query)
            .lean()
            .then(mmorpg => res.json(mmorpg))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        MMOrpg.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });