const mongoose = require('mongoose');

const EconomySchema = new mongoose.Schema({
    userId: { type: String, required: false },
    passive: { type: Boolean, required: false, default: false },
    coinsInWallet: { type: Number, required: false, default: 0 },
    coinsInBank: { type: Number, required: false, default: 0 },
    bankSpace: { type: Number, required: false, default: 1500 },
    items: { type: Array, required: false, default: [] },
    cooldowns: {
        daily: { type: Date, required: false, default: new Date(Date.now() - 86400000) },
        work: { type: Date, required: false, default: new Date(Date.now() - 600000) },
        beg: { type: Date, required: false, default: new Date(Date.now() - 300000) },
        weekly: { type: Date, required: false, default: new Date(Date.now() - 604800000) },
        hunt: { type: Date, required: false, default: new Date(Date.now() - 420000) },
        dig: { type: Date, required: false, default: new Date(Date.now() - 420000) },
        rob: { type: Date, required: false, default: new Date(Date.now() - 3600000) }
    }
});

module.exports = mongoose.model('Economy', EconomySchema);