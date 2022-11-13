const { Schema, Types } = require('mongoose');
const moment =  require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 200
        },
        username: {
            type: String,
            required: true
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => moment(timestamp).format('MMM DD. YYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

module.exports = reactionSchema;
