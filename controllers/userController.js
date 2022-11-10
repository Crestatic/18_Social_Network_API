const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getAllUsers(req, res) {
        User.find()
        // .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        select('-__v')
        .then((user) =>
            !user
                ? res.status(404).json( { message: 'No user with that ID' })
                : res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
            });
    },
    // Create a new user
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json( { message: 'No user with that ID' })
                    : res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
                });
    },
    // Delete user and associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No such user exists' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts} })
            )
                .then(() => res.json({ message: 'User has been deleted' }))
                .catch((err) => res.status(500).json(err));
    },
    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToset: { friends: req.params.friendID } },
            { new: true }
        )
            .then((user) =>
            !user
                ? res.status(404).json( { message: 'No user with that ID' })
                : res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
                });
    },
    // Remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendID } },
            { runValidators: true, new: true }
        )
            .then((user) =>
            !user
                ? res.status(404).json( { message: 'No user with that ID' })
                : res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
                });
    }
}