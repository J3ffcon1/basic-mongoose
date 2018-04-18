const { assert } = require('chai');
const request = require('./request');
const videogame = require('../../lib/models/videogame');
const { dropCollection } = require('./db');

describe('World of Wacraft API test', () => {
    before(() => dropCollection('videogames'));

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
});