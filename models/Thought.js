const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD. YYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

// Virtual property 'reactionCount'
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Initiate the thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;