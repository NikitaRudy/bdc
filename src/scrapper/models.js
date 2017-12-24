const mongoose = require('mongoose');

const TopPlayersSchema = new mongoose.Schema({
    players: Array,
    submitDate: Number,
    id: String,
    lbPlayersCount: Number,
});
const TopPlayers = mongoose.model('TopPlayers', TopPlayersSchema);

const SnapshotSchema = new mongoose.Schema({
    players: Array,
    submitDate: Number,
    lbPlayersCount: Number,
});
const Snapshot = mongoose.model('Snapshots', SnapshotSchema);


module.exports = { Snapshot, TopPlayers };
