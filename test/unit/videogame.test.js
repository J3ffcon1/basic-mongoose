const { assert } = require('chai');
const MMOrpg = require('../../lib/models/videogame');

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
        const videogame = new MMOrpg(data);

        assert.deepEqual(videogame.toJSON(), {
            _id: videogame._id,
            ...data
        });

        assert.isUndefined(videogame.validateSync());
    });

    it('has a limit of two weapons', () => {
        const videogame = new MMOrpg({ name: 'Jaina Proudmoore' });
        assert.ok(videogame.weapons);
        assert.isAtMost(videogame.weapons < 3);
    });
    
    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected validation errors but got none');
        return validation.errors;
    };
    
    it('required fields', () => {
        const videogame = new MMOrpg({});
        const errors = getValidationErrors(videogame.validateSync());
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.class.kind, 'required');
        assert.equal(errors['weapons.spellbook'].kind, 'required');
    });

    it('class must be enum', () => {
        const videogame = new MMOrpg({
            name: 'test',
            class: 'test',
            faction: 'test',
            
        });
        const errors = getValidationErrors(videogame.validateSync());
        assert.equal(errors['class'].kind, 'enum');
    });

});