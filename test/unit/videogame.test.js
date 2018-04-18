const { assert } = require('chai');
const mmorpg = require('../../lib/models/videogame');

describe('Videogame model', () => {

    it('valid good model', () => {
      
        let data = {
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
        const videogame = new mmorpg(data);

        assert.deepEqual(videogame.toJSON(), {
            _id: videogame._id,
            ...data
        });
    });
});