const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter valid email address."],
        },

        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],

        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual property 'friendcount' that gets the ammount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initiate the User model
const User = model("User", userSchema);

module.exports = User;