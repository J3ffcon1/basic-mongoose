const { assert } = require('chai');
const request = require('./request');
const mongoose = require('mongoose');
const MMOrpg = require('../../lib/models/videogame');

describe('World of Wacraft API test', () => {
    
    before(() => {
        return mongoose.connection.dropCollection('mmorpgs')
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    });

    let player1 = {
        name: 'Jaina Proudmoore',
        class: 'Mage',
        faction: 'Alliance',
        wardrobe: {
            hat: 'Hood',
            armor: 'Int+ Cloak',
            pet: 'Owl',
        },
        weapons: ['spellbook', 'wand', 'taser']
    };

    let player2 = {
        name: 'Garrosh Hellscream',
        class: 'Hunter',
        faction: 'Horde',
        wardrobe: {
            hat: 'helm',
            armor: 'Leather vest',
            pet: 'Wolf',
        },
        weapons: ['crossbow', 'dagger', 'temper']
    };

    it('saves players and returns them', () => {
        return request.post('/videogames')
            .send(player1)
            .then(({ body }) => {
                assert.deepInclude(body, player1);
                player1 = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets a player by their id', () => {
        return MMOrpg.create(player2).then(roundTrip)
            .then(saved =>{
                player2 = saved;
                return request.get(`/videogames/${player2._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, player2);
            });
    });

    it('update a player', () => {
        player2.weapons[2] = 'surly demeanor';

        return request.put(`/videogames/${player2._id}`)
            .send(player2)
            .then(({ body }) => {
                assert.deepEqual(body, player2);
                return MMOrpg.findById(player2._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, player2);
            });
    });

    it('deletes a player', () => {
        return request.delete(`/videogames/${player2._id}`)
            .then(() => {
                return MMOrpg.findById(player2._id);
            })
            . then(found => {
                assert.isNull(found);
            });
    });

    it('returns 404 on get of non-existent id', () => {
        return request.get(`/videogames/${player2._id}`)
            .then(response => {
                assert.equal(response.status, 404);
            });
    });
});