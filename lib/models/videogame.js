const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: RequiredString,
    class: {
        ...RequiredString,
        enum: ['Death Knight', 'Druid', 'Hunter', 'Mage', 'Monk', 'Paladin,', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior']
    },
    faction: RequiredString,
    wardrobe: {
        hat: String,
        armor: RequiredString,
        pet: String,
    },
    weapons: [String]
});

module.exports = mongoose.model('MMOrpg', schema);